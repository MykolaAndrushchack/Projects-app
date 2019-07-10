import { ProjectService } from '../../services/project.service';
import { Project } from '../../Models/project.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];

  constructor(private heroService: ProjectService) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.heroService.getProjects().subscribe(projects => {
      this.projects = projects.slice(0, 4);
    });
  }
}
