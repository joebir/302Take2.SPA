import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { PaginatedResult } from "../models/pagination";
import { User } from "../models/User";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class FollowersResolver implements Resolve<PaginatedResult<User[]>> {

    pageSize = 12;
    pageNumber = 1;
    followParam = 'Followers';

    constructor(
        private _userService: UserService,
        private _router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
        return this._userService.getUsers(this.pageNumber, this.pageSize, null, this.followParam);
    }
}