import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models';

@Injectable()
export class GuardsAdmin implements CanActivate {

    constructor(private router: Router) { }
    currentUser: User; 

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        console.log(localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser')) {
            
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                console.log(this.currentUser.admins);
            if (this.currentUser.admins === 1) {
                // logged in so return true
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}