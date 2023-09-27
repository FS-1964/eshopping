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
  private _loggedUser = new BehaviorSubject<string>("");
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'garibaldi';
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  public LoggedInUser$ = this._loggedUser.asObservable();
  User!: user | null;
  isLoggedin: any;
  isAuthenticated: any;

  apiurl = 'https://localhost:7203/api/user/Authenticate';
  constructor(private http: HttpClient, private _router: Router) {
    this._isLoggedIn$.next(!!this.token);
    this._loggedUser.next(this.token);
    // this.User = this.getUser(this.token) as user;
  }
  getLoggedUser() {
    return this._loggedUser.asObservable();
  }

  login(UserCred: any) {

    return this.http.post(this.apiurl, UserCred).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        this._loggedUser.next(this.getUserName(response.token));
        this.isLoggedin = true;
        localStorage.setItem(this.TOKEN_NAME, response.token);
       
        localStorage.setItem("loggeduser", this.getUserName(response.token));

      })
    );
  }
  public getActualUser(): string {
    return localStorage.getItem("loggeduser")!;
  }


  public getUserName(token: string): string {

    if (!token) {
      return "";
    }
    let tmpuser = JSON.parse(atob(token.split('.')[1]));
    return tmpuser.unique_name;
  }

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }
  get token_userName(): any {
   // alert(this.getUserName(localStorage.getItem(this.TOKEN_NAME)!));
 
    return this.getUserName(localStorage.getItem(this.TOKEN_NAME)!);
  }
  ProceedLogin(UserCred: any) {
    return this.http.post<any>(this.apiurl, UserCred);
  }
  ProceedLogout() {

    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem("loggeduser");
    this._router.navigate(['home']);

  }
  public HaveAccess() {
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
