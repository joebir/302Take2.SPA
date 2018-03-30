import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../models/AuthUser';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
  baseUrl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private _http: HttpClient,
    private _jwtHelperService: JwtHelperService) { }

  login(model: any) {
    return this._http.post<AuthUser>(this.baseUrl + 'auth/login', model, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
      .map(user => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this._jwtHelperService.decodeToken(user.tokenString);
          this.currentUser = user.user;
          this.userToken = user.tokenString;
          this.changeMemberPhoto(this.currentUser.photoUrl);                          //  <--- Added
        }
      });
  }

  loggedIn() {
    const token = this._jwtHelperService.tokenGetter();

    if (!token) {
      return false;
    }

    return !this._jwtHelperService.isTokenExpired(token);
  }

  register(model: any) {
    return this._http.post(this.baseUrl + 'auth/register', model, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
}
