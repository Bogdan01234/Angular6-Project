import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AllService } from '../../../_services/all.service';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../../_models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  currentUser: string;
  commentData: FormData = new FormData();
  comment = new FormControl('');
  @Input() postId: number;
  constructor(
    // private httpClient: HttpClient,
    private allService: AllService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    this.getComments(this.postId, this.currentUser);
    setInterval(()=> {
      this.getComments(this.postId, this.currentUser); },4000); 

  }

  getComments(postId, content): void {
    this.allService.getComments(postId, content).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

  addComment() {
    this.commentData = new FormData;
    this.commentData.append('postId', ''+ this.postId);
    this.commentData.append('usetName', this.currentUser);
    this.commentData.append('content', this.comment.value);
    this.allService.addComment(this.commentData).subscribe(data => {
      console.log(data);
    });
    this.getComments(this.postId, this.currentUser);
  }

  keypress(event): void {  
    event.preventDefault();
    event.target.value = '';
    this.addComment();
  }

}