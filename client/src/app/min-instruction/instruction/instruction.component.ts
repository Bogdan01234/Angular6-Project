import { Component, OnInit, ViewChild } from '@angular/core';
// import {PageScrollConfig} from 'ng2-page-scroll';
import {MatStepper} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AllService } from '../../_services/all.service';
import { HttpClient } from '@angular/common/http';

import { UserService} from '../../_services/user.service';

// import { UserCard } from '../user-card';
// import { PostCard } from '../post-card';
// import { Step } from '../step';

import { Post } from '../../_models';
import { User } from '../../_models';
import { Step } from '../../_models';

@Component({
  selector: 'abe-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

@ViewChild('stepper') stepper: MatStepper;
  constructor(
    private route: ActivatedRoute,
    private httpService: AllService,
    private userService: UserService,
    private router: Router
  ) { 
    // PageScrollConfig.defaultScrollOffset = 110;
}
  post: Post;
  postId: string;
  user: User;
  currentUser: string;
  isLoaded: boolean;
  steps: Step[];
  liked: boolean;
  isLoggedIn: boolean;
  formData: FormData = new FormData();

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.isLoaded = false;
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn = true;
      this.currentUser = localStorage.getItem('currentUser');
    }
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpService.getPost(id)
    .subscribe((data) => {
      if (!data.username) {
        this.router.navigate(['/']);
      }
      this.post = data;
      this.getUser(this.post.username);
      this.getSteps(data.id, data.numSteps);
    });
    
    
  }

  getUser(username): void {
    this.userService.getByName(username)
      .subscribe(user => {
        this.user = user;
       
      });
  }

  getSteps(postId, numSteps): void {
    this.httpService.getSteps(postId, numSteps)
      .subscribe(data => {
        this.steps = data;
       
        this.isLoaded = true;
      });
  }

  toggle(event): void {
    if (!event.target.closest('#panel').nextElementSibling.getAttribute('hidden')) {
      event.target.closest('#panel').nextElementSibling.setAttribute('hidden', 'true');  
    } else {
      event.target.closest('#panel').nextElementSibling.removeAttribute('hidden');
    }
  } 

  // updateStars(value) {
  //   this.formData.append('value', value);
  //   this.formData.append('post_id', ''+this.post.id);
  //   this.formData.append('username', localStorage.getItem('currentUser'));
  //   this.httpClient.post("http://howto.ru/update_stars", this.formData).subscribe(data => {
  //     console.log(data);
  //   });
  // }

}
