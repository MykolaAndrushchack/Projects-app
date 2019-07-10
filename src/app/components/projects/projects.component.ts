import { Component, OnInit } from '@angular/core';
import { Project } from '../../Models/project.interface';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  project: Project[];

  constructor(private projectsService: ProjectService) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectsService
      .getProjects()
      .subscribe(project => (this.project = project));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;

    this.projectsService.addProject({ name } as Project).subscribe(project => {
      this.project.push(project);
    });
  }

  delete(project: Project): void {
    this.project = this.project.filter(p => p !== project);
    this.projectsService.deleteProject(project).subscribe();
  }
}
