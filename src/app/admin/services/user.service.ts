import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseApiUrl: string = 'https://localhost:7203';
  @Output() event = new EventEmitter();
  constructor(private http: HttpClient) { }

  updateUser(id: string, userDetails: user): Observable<user> {
    return this.http.put<user>(this.baseApiUrl + '/api/user/updateuser/' + id, userDetails);
  }
  getUsers(): Observable<user[]> { 
    return this.http.get<user[]>(this.baseApiUrl + '/api/user/users');
  }

  getUser(id: string): Observable<user> {
    return this.http.get<user>('https://localhost:7203/api/user/user/' + id);
  }
  addUser(requesteduser: user): Observable<user> {console.log(requesteduser);
    requesteduser.id='00000000-0000-0000-0000-000000000000';
    return this.http.post<user>('https://localhost:7203/api/user/Register',requesteduser );
  }
  deleteUser(id: string): Observable<user> {
    return this.http.delete<user>( 'https://localhost:7203/api/user/deleteuser/' + id);
  }
}
