import { Message } from "../models/Message";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AlertifyService } from "../services/alertify.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';

    constructor(
        private _userService: UserService,
        private _authService: AuthService,
        private _router: Router,
        private _alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this._userService.getMessages(this._authService.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer)
            .catch(error => {
            this._alertify.error('Problem retrieving data');
            this._router.navigate(['/home']);
            return Observable.of(null);
        });
    }
}