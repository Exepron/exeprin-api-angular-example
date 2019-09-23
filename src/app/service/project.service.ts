import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../Models/project.model';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  httpOptions = {};
  projectFields = 'projectName,projectId,status,earlyWarning,earlyWarningStatus,projectManagerID,riskQuotient,projectDueDate,lastModifiedOn,lastModifiedByUserID,projectObjective,bufferPenetration,projectStatusName,projectManager,projectSuggestedStartDate,minimalStartDate';

  constructor(
    private userService:UserService,
    private configuration: Configuration,
    private http: HttpClient,
    ) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'accept': 'application/json',
          'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
        })
      };
    }

  getAccount() {
    let currentUser = this.userService.getCurrentUser();
    if (currentUser)
    {
      return {userId: currentUser.userId, accountId: currentUser.accountId}
    }
    else
    {
      return {userId: -1, accountId: -1};
    }
  }

  getMyProjects() : Observable<Project[]> {
    let account = this.getAccount()
    return this.http.get<Project[]>(`${this.configuration.ApiServer}/0/Users/0/Projects?$count=true&$select=${this.projectFields}&$expand=projectManager&$filter=status eq 2 or status eq 3&$orderby=status desc`, this.httpOptions)
  }
}
