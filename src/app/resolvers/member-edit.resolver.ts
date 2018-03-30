import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../models/User";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this._userService.getUser(this._authService.decodedToken.nameid);
    }
}