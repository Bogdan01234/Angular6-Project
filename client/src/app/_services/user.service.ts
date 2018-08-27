import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../_models';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + '/users');
    }

    getByName(username: string):Observable<User> {
        return this.http.get<User>(appConfig.apiUrl + '/users/' + username);
    }

    getById(id: string){
        console.log(id, "ssssss");
        return this.http.get(appConfig.apiUrl + '/users/' + id);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + '/users/' + user.id, user);
    }

    delete(id: string) {
        return this.http.delete(appConfig.apiUrl + '/users/' + id);
    }

    blocking(id: string) {
        return this.http.get(appConfig.apiUrl + '/users/blocking/' + id);
    }

    unblock(id: string){
        return this.http.get(appConfig.apiUrl + '/users/unblock/' + id);
    }

    addAdmin(id: string){
        return this.http.get(appConfig.apiUrl + '/users/addAdmin/' + id);
    }

    deleteAdmin(id: string){
        return this.http.get(appConfig.apiUrl + '/users/deleteAdmin/' + id);
    }

    
}