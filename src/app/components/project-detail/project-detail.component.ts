import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/services';
import { Project } from 'src/app/Models/project.interface';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.getProject();
  }

  getProject(): void {
    const id = +this.activateRoute.snapshot.paramMap.get('id');
    this.projectService
      .getProject(id)
      .subscribe(project => (this.project = project));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.projectService
      .updateProject(this.project)
      .subscribe(() => this.goBack());
  }
}
