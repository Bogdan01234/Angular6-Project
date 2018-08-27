import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CloudData } from 'angular-tag-cloud-module';
import { Observable, of } from 'rxjs';
import { Post } from '../_models';
import { Step } from '../_models';
import { Comment } from '../_models';
import { appConfig } from '../app.config';
import { Appload } from '../interfase/index'


@Injectable({
  providedIn: 'root'
})
export class AllService {

  formData: FormData = new FormData();

  constructor(private http: HttpClient) { }

  getComments(postId, login): Observable<Comment[]> {
    return this.http.get<Comment[]>(appConfig.apiUrl + '/comments/'+ postId + login)
  }

  addComment(comment: FormData) : Observable<Comment> {
    return this.http.post<Comment>(appConfig.apiUrl + '/comment/', comment);
   }    

  getSteps(postId, numSteps): Observable<Step[]> {
    return this.http.get<Step[]>(appConfig.apiUrl + '/steps' + postId +numSteps)
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(appConfig.apiUrl + '/post' + id)
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(appConfig.apiUrl + '/post')
  }

  getCategoryCards(category): Observable<Post[]> {
    return this.http.get<Post[]>(appConfig.apiUrl + '/category' + category)
  }

  getRecentPostCards(): Observable<Post[]> {
    return this.http.get<Post[]>(appConfig.apiUrl + '/recentPost')
  }

  getUserPosts(login: string): Observable<Post[]> {
    return this.http.get<Post[]>(appConfig.apiUrl + '/return_user_posts' + login)
  }

  addPosts(arrayAppload) {
    console.log(arrayAppload, "heeer")
  
    return this.http.post(appConfig.apiUrl + '/users/instruction', arrayAppload);
  }
  
}