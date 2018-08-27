import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ProfileComponent } from './profile';
import { LandingComponent } from './landing';
import { AuthGuard, GuardsAdmin } from './_guards';
import { InstructionComponent } from './instruction/instruction.component';





const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'home', component: HomeComponent, canActivate: [GuardsAdmin] },
    { path: 'instruction/:id', component: InstructionComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);