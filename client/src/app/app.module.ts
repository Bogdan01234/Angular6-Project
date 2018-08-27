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
import { RatingModule } from 'ngx-bootstrap';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ProfileComponent } from './profile';
import { LandingComponent } from './landing';
import { LoginComponent } from './login/login.component';
import { AuthGuard, GuardsAdmin } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, AllService } from './_services';
import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import { NavbarComponent } from './shared/navbar/navbar.component';


import { AppComponent } from './app.component';
import { routing }        from './app.routing';
import { MinInstructionComponent } from './min-instruction/min-instruction.component';
import { InstructionComponent } from './instruction/instruction.component';
import { CreatreInstructionComponent } from './creatre-instruction/creatre-instruction.component';
import { CreatreStepComponent } from './creatre-instruction/create.step/creatre.step.component';

import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { FileDropModule } from 'ngx-file-drop';
import { CommentsComponent } from './instruction/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    LandingComponent,
    NavbarComponent,
    LoginComponent,
    MinInstructionComponent,
    InstructionComponent,
    CreatreInstructionComponent,
    CreatreStepComponent,
    CommentsComponent
  ],
  imports: [
    FileDropModule,
    NouisliderModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextareaModule,
    RatingModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule,
    FormsModule,
    BrowserModule,
    AgmCoreModule,
    BrowserAnimationsModule, // new modules added here
    MatToolbarModule,
    JWBootstrapSwitchModule,
    routing,
    Ng2CloudinaryModule,
    FileUploadModule,
    MatCardModule
  ],
  providers: [
    AuthGuard,
    GuardsAdmin,
        AlertService,
        AuthenticationService,
        AllService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
