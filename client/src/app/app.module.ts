import { NgModule } from '@angular/core';

import { ReactiveFormsModule }    from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProfileComponent } from './profile';
import { LandingComponent } from './landing';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    LandingComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    NouisliderModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    CommonModule,
    FormsModule,
    BrowserModule,
    AgmCoreModule,
    BrowserAnimationsModule, // new modules added here
    MatToolbarModule,
    JWBootstrapSwitchModule,
    routing,
    MatCardModule
  ],
  providers: [
    AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
