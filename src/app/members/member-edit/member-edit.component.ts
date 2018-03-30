import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private _route: ActivatedRoute,
    private _alertify: AlertifyService,
    private _userService: UserService,
    private _authService: AuthService) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this._userService.updateUser(this._authService.decodedToken.nameid, this.user).subscribe(next => {
      this._alertify.success('Profile updated successfully.');
      this.editForm.reset(this.user);
    }, error => {
      this._alertify.error(error);
    });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}