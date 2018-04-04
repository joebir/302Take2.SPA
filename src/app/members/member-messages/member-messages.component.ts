import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Message } from '../../models/Message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private _userService: UserService,
              private _authService: AuthService,
              private _alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this._authService.decodedToken.nameid;                                   //  1.
    this._userService.getMessageThread(currentUserId, this.userId)                                  //  2.
      .do(messages => {                                                                             //  3.
        _.each(messages, (message: Message) => {                                                    //  4.
          if (message.isRead === false && message.recipientId === currentUserId) {                  //  5.
            this._userService.markAsRead(currentUserId, message.id);                                //  6.
          }
        });
      })
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this._alertify.error(error);
      });
}

  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this._userService.sendMessage(this._authService.decodedToken.nameid, this.newMessage).subscribe(message => {
      this.messages.unshift(message);
      this.newMessage.constructor = '';
    }, error => {
      this._alertify.error(error);
    });
  }
}