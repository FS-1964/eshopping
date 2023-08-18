import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { user } from '../models/user';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'garibaldi';
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  User!: user | null;
  isLoggedin: any;
  isAuthenticated: any;
  apiurl = 'https://localhost:7203/api/Employees/Authenticate';
  constructor(private http: HttpClient, private _router: Router) {
    this._isLoggedIn$.next(!!this.token);
    this.User = this.getUser(this.token);
  }
  login(UserCred: any) {
    return this.http.post(this.apiurl, UserCred).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        this.isLoggedin = true;
        localStorage.setItem(this.TOKEN_NAME, response.token);
        this.User = this.getUser(response.token); console.log(this.User)

      })
    );
  }
  private getUser(token: string): user | null {
    if (!token) {
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as user;
  }

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }
  ProceedLogin(UserCred: any) {
    return this.http.post<any>(this.apiurl, UserCred);
  }
  ProceedLogout() {
    localStorage.removeItem(this.TOKEN_NAME);
    this._router.navigate(['home']);
  }
  HaveAccess() {
    var loggintoken = localStorage.getItem(this.TOKEN_NAME) || '';
    var returnresult = false;
    var _extractedtoken = loggintoken.split('.')[1];

    if (_extractedtoken != null) {
      var _atobdata = atob(_extractedtoken);
      var _finaldata = JSON.parse(_atobdata);

      if (_finaldata == null) return false;
      if (_finaldata.role == 'Admin') {
        returnresult = true
      } else {

        returnresult = false
      }
    }
    return returnresult;
  }
}
