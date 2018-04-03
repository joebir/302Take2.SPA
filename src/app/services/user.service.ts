import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../models/pagination';


@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService) { }

  getUsers(page?, itemsPerPage?, userParams?, followParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('specialty', userParams.specialty);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (followParam === 'Followers') {
      params = params.append('Followers', 'true');
    }

    if (followParam === 'Followees') {
      params = params.append('Followees', 'true');
    }

    return this._http
      .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .map(response => {
        paginatedResult.result = response.body;

        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }

        return paginatedResult;
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

  deletePhoto(userId: number, id: number) {
    return this._http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  followUser(id: number, recipientId: number) {
    return this._http.post(this.baseUrl + 'users/' + id + '/follow/' + recipientId, {});
  }
}