import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Project } from 'src/app/Models/project.interface';
import { ProjectService } from 'src/app/services';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent implements OnInit {
  projects$: Observable<Project[]>;
  private searchTerms = new Subject<string>();

  constructor(private projectService: ProjectService) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.projects$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.projectService.searchProject(term))
    );
  }
}
