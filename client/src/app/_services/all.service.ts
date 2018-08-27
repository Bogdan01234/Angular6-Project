import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CloudData } from 'angular-tag-cloud-module';
import { Observable, of } from 'rxjs';
import { Post } from '../_models';
import { Step } from '../_models';
import { Comment } from '../_models';
import { appConfig } from '../app.config';
import { Appload, ArrayAppload } from '../interfase/index'


@Injectable()

export class AllService {

  formData: FormData = new FormData();

  constructor(private http: HttpClient) { }

  getComments(postId, login): Observable<Comment[]> {
    return this.http.get<Comment[]>(appConfig.apiUrl + '/users/comments/'+ postId + login)
  }

  addComment(comment: FormData) : Observable<Comment> {
    return this.http.post<Comment>(appConfig.apiUrl + '/users/comment/', comment);
   }    

  getSteps(postId, numSteps): Observable<Step[]> {
    return this.http.get<Step[]>(appConfig.apiUrl + '/users/steps' + postId +numSteps)
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(appConfig.apiUrl + '/users/post' + id)
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(appConfig.apiUrl + '/users/post')
  }

  getCategoryCards(category): Observable<Post[]> {
    return this.http.get<Post[]>(appConfig.apiUrl + '/users/category' + category)
  }

  getRecentPostCards(): Observable<Post[]> {
    return this.http.get<Post[]>(appConfig.apiUrl + '/users/recentPost')
  }

  getUserPosts(login: string): Observable<Post[]> {
    return this.http.get<Post[]>(appConfig.apiUrl + '/getPosts' + login)
  }

  addPosts(arrayAppload) {
    console.log(arrayAppload, "heeer")
  
    return this.http.post(appConfig.apiUrl + '/users/instruction', arrayAppload);
  }

  
}