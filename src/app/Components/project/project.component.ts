import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Models/project.model';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  pageSize: number=10;
  totalItems: any;
  page: number=1;
  previousPage: any;
  collectionSize:number=1;

  Project:Project[];
  constructor(
    private projectService:ProjectService
  ) { }

  ngOnInit() {
    this.projectService.getMyProjects().subscribe((projects) => { this.Project=projects;});
   
  }

  
}
