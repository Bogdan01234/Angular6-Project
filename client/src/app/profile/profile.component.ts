import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';


@Component({
  // selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  currentUser: User;
  user: User;;

  max = 10;
  rate = 7;
  isReadonly = false;
 
  overStar: number;
  percent: number;
 
  
    data : Date = new Date();
    focus;
    focus1;

    constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     }

    ngOnInit() {
        
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    hoveringOver(value: number): void {
      this.overStar = value;
      this.percent = (value / this.max) * 100;
    }
   
    resetStar(): void {
      this.overStar = void 0;
    }



}
