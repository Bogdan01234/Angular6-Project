import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ProfileComponent } from './profile';
import { LandingComponent } from './landing';
import { AuthGuard } from './_guards';
import { InstructionComponent } from './min-instruction/instruction/instruction.component';
import { CreatreInstructionComponent } from './creatre-instruction/creatre-instruction.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'instruction', component: InstructionComponent },
    { path: 'create', component: CreatreInstructionComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);