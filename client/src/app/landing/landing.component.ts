import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { Categories } from '../interfase';

@Component({
  // selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;

  categories: Categories[] = [
    {value:'Cars & Other Vehicles'},
    {value:'Computers and Electronics'},
    {value:'Sport & Fitness'},
    {value:'Family Life'},
    {value:'Auto'},
    {value:'Food and Entertaining'},
    {value:'Health'},
    {value:'Hobbies and Crafts'},
    {value:'Pets and Animals'},
    {value:'Sports and Fitness'}
  ];

  constructor() { }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
