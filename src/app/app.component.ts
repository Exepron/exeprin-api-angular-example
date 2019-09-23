import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  isAuthorizedSubscription: Subscription | undefined;
  isAuthorized = false;
  authSubscription: Subscription;
  onChecksessionChanged: Subscription | undefined;
  checksession = false;
  hash: string;
  currentUser:User;
  constructor(
    public oidcSecurityService: OidcSecurityService,
    private router: Router,
    public userService: UserService,
  ) {

    if (typeof location !== 'undefined' && window.location.hash) {
      const indexHash = window.location.hash.indexOf('id_token');
      if (indexHash > -1) {
        this.doCallbackLogicIfRequired();
      }
    }
   }

  ngOnInit() {
      this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe((isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
        if (isAuthorized) {          
            this.userService.fetchUserById().subscribe(()=>{
              this.currentUser=this.userService.getCurrentUser();
              this.router.navigate(['/projects']);
            });
        }
        else {
          this.isAuthorizedSubscription.unsubscribe();
          this.login();
        }
      });
  }
  ngOnDestroy(): void {
    if (this.isAuthorizedSubscription) {
      this.isAuthorizedSubscription.unsubscribe();
    }
  } 

  login() {
    console.log('start login');
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    console.log('start refreshSession');
    this.oidcSecurityService.authorize();
  }

  logout() {
    console.log('start logoff');
    this.oidcSecurityService.logoff();
    this.userService.logOut();
  }

  getTokenHash() {
    if (typeof location !== 'undefined' && window.location.hash) {
      const indexHash = window.location.hash.indexOf('id_token');
      return indexHash > -1 && window.location.hash.substr(indexHash);
    }
  }
 
  private doCallbackLogicIfRequired() {
    const hash = this.getTokenHash();
    if (hash) {
      this.oidcSecurityService.authorizedImplicitFlowCallback(hash);
    }
  }

}