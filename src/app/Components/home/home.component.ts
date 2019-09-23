import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthorizedSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    public oidcSecurityService: OidcSecurityService,
    public userService: UserService
  ) { }

  ngOnInit() {
   
    if(this.userService.getCurrentUser()){
      this.router.navigate(['/projects']);
    };  

  }

}
