import { Component, OnInit } from '@angular/core';
import { PaginatedResult, Pagination } from '../models/pagination';
import { Message } from '../models/Message';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private _userService: UserService,
    private _alertify: AlertifyService,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this._userService
      .getMessages(this._authService.decodedToken.nameid, this.pagination.currentPage,
        this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this._alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this._alertify.confirm('Are you sure you want to delete the message?', () => {
      this._userService.deleteMessage(id, this._authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(_.findIndex(this.messages, { id: id }), 1);
        this._alertify.success('Message has been deleted');
      }, error => {
        this._alertify.error('Failed to delete the message');
      });
    });
  }

}