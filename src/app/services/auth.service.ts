import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

import { User } from '../models/userModel';
import { LoginModel } from '../models/loginModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject!: BehaviorSubject<User | null>;
  public user: Observable<User | null>;


  apiUrl = "http://localhost:8000/";

  token: any;
  isLoggedIn: boolean = false;


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService

  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value!;
  }
  isAuthenticated() {
    if (this.userValue != null) {
      return true;
    }
    else {
      return false
    }
  }
  login(loginModel: LoginModel) {
    return this.httpClient.post(this.apiUrl + 'user/login', loginModel);
    // return this.httpClient.get<Array<User>>(this.apiUrl + 'register?email=' + loginModel.email);
  }

  register(data: any) {
    return this.httpClient.post(this.apiUrl + 'user/create', data)
  }
  logout() {
    // remove user from local storage to log user out
    this.localStorage.clear()
    this.userSubject.next(null)
    this.onRefresh();
    this.router.navigate(['/login']);
  }
  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    })
  }


}
