import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  userParams: any = {};

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.specialty = 'all';
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
}

loadUsers() {
  this._userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    });
}

}
