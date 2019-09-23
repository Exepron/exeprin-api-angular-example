import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { ProjectComponent } from './Components/project/project.component';
import { AuthModule, OidcSecurityService,  OidcConfigService, ConfigResult,  OpenIdConfiguration } from 'angular-auth-oidc-client';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Configuration } from './app.constants';
import { TokenInterceptorService } from './service/token-interceptor.service';

const ServerUrl = `assets/auth.clientConfiguration.json`;

export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP_INITIALIZER STARTING');
  return () => oidcConfigService.load(ServerUrl);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    OidcConfigService,
    OidcSecurityService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    },
     Configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private oidcConfigService: OidcConfigService,
    configuration: Configuration,
  ) {

    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {


      const config: OpenIdConfiguration = {
        stsServer: configResult.customConfig.stsServer,
        redirect_url: configResult.customConfig.redirect_url,
        client_id: configResult.customConfig.client_id,
        response_type: configResult.customConfig.response_type,
        scope: configResult.customConfig.scope,
        post_logout_redirect_uri: configResult.customConfig.post_logout_redirect_uri,
        start_checksession: configResult.customConfig.start_checksession,
        silent_renew: configResult.customConfig.silent_renew,
        silent_renew_url: configResult.silent_renew_url,
        post_login_route: configResult.customConfig.startup_route,
        forbidden_route: configResult.customConfig.forbidden_route,
        unauthorized_route: configResult.customConfig.unauthorized_route,
        log_console_warning_active: configResult.customConfig.log_console_warning_active,
        log_console_debug_active: configResult.customConfig.log_console_debug_active,
        max_id_token_iat_offset_allowed_in_seconds:
        configResult.customConfig.max_id_token_iat_offset_allowed_in_seconds,
      };
        this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    });
    console.log('APP STARTING');
  }
}
