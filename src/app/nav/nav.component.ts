import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(
    public authService: AuthService,
    private _router: Router,
    private _alertify: AlertifyService) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this._alertify.success('Logged in successfully');
    }, error => {
      this._alertify.error('Failed to login');
    }, () => {
      this._router.navigate(['members']);
    });
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._alertify.success('Logged out');
    this._router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}