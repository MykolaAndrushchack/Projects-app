import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  constructor() {}

  createDb() {
    const projects = [
      {
        id: 1,
        name: 'Project 1'
      },
      {
        id: 2,
        name: 'Project 2'
      },
      {
        id: 3,
        name: 'Project 3'
      },
      {
        id: 4,
        name: 'Project 4'
      },
      {
        id: 5,
        name: 'Project 5'
      },
      {
        id: 6,
        name: 'Project 6'
      },
      {
        id: 7,
        name: 'Project 7'
      }
    ];
    return { projects };
  }
}
