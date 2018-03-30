import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this._authService.decodedToken = this._jwtHelperService.decodeToken(token);
    }

    if (user) {
      this._authService.currentUser = user;
      this._authService.changeMemberPhoto(user.photoUrl);
    }
  }
}