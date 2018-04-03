import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { PaginatedResult } from '../models/pagination';

@Injectable()
export class MemberListResolver implements Resolve<PaginatedResult<User[]>> {

    pageSize = 12;
    pageNumber = 1;

    constructor(
        private _userService: UserService,
        private _router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
        return this._userService.getUsers(this.pageNumber, this.pageSize);
    }
}