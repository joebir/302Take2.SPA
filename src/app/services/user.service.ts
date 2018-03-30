import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService) { }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.baseUrl + 'users', {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ` + this._authService.decodedToken)
    });
  }

  getUser(id): Observable<User> {
    return this._http
      .get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this._http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this._http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }
}