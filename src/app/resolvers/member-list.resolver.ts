import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    constructor(
        private _userService: UserService,
        private _router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this._userService.getUsers();
    }
}