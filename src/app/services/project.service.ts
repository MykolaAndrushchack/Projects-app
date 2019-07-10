import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';

import { Project } from '../Models/project.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'aplication/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'api/projects';

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) {}

  private log(message: string): void {
    this.messagesService.add(`Project Service  ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      tap(() => this.log(`fetched projects`)),
      catchError(this.handleError('getProjects', []))
    );
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;

    return this.http.get<Project>(url).pipe(
      tap(() => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`get project id=${id}`))
    );
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, httpOptions).pipe(
      tap(() => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<Project>(`updateProject`))
    );
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, httpOptions).pipe(
      tap(() => this.log(`added project id=${project.id}`)),
      catchError(this.handleError<Project>(`addProject`))
    );
  }

  deleteProject(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions).pipe(
      tap(() => this.log(`delete project id=${id}`)),
      catchError(this.handleError<Project>(`deleteProject`))
    );
  }

  searchProject(term: string): Observable<Project[]> {
    if (!term.trim()) return of([]);

    return this.http.get<Project[]>(`${this.projectsUrl}/?name=${term}`).pipe(
      tap(() => this.log(`found projects matching ${term}`)),
      catchError(this.handleError<Project[]>(`searchproject`, []))
    );
  }
}
