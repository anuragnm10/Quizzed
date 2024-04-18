import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  //generate token

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //Login user: set token in local storage

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  //isLogin : user us logged in or not

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //logout : remove token from local storage

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //getToken : return token from local storage

  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetail: setting user details in local storage

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get userDetails: getting user details from local storage

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  //current user : returns user who is logged in

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }
}
