import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Pagination, PaginatedResult } from '../models/pagination';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  followParam: string;

  constructor(private _userService: UserService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _alertify: AlertifyService) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.followParam = 'Followers';
  }

  loadUsers() {
    this._userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.followParam)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this._alertify.error(error);
      });
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}