import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.users = data['users'];
    });
  }
}
