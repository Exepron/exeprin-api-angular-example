import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersFetched: boolean = false;
  loggedInUserId?: User = null;

  constructor(private http: HttpClient,
    public configuration: Configuration,
  ) { }


   fetchUserById() {
    return this.http.get<User>(this.configuration.ApiServer + '/Users/GetLoggedinUser').pipe(map(
      (user) => {
        this.loggedInUserId = user;    
      }
    ));
  }

  logOut(): void {
    this.loggedInUserId = null;
  }

  getCurrentUser():User{
    return this.loggedInUserId;
  }
}
