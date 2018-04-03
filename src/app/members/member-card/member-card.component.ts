import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private _authService: AuthService,
              private _userService: UserService,
              private _alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  followUser(id: number) {
    this._userService.followUser(this._authService.decodedToken.nameid, id).subscribe(data => {
      this._alertifyService.success('Now following: ' + this.user.knownAs);
    }, error => {
      this._alertifyService.error(error);
    });
  }

}