import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.loggedIn()) {
      return true;
    }

    console.log('You need to be logged in to access that.');
    this._router.navigate(['/home']);
    return false;
  }
}