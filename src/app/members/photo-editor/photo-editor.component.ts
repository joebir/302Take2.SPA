import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  currentMain: Photo;
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this._authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);
      }
    };

  }

  setMainPhoto(photo: Photo) {
    this._userService.setMainPhoto(this._authService.decodedToken.nameid, photo.id).subscribe(() => {
      this.currentMain = _.findWhere(this.photos, { isMain: true });
      this.currentMain.isMain = false;
      photo.isMain = true;
      this._authService.changeMemberPhoto(photo.url);
      this._authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this._authService.currentUser));
    }, error => {
      this._alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    this._alertify.confirm('Are you sure you want to delete this?', () => {
      this._userService.deletePhoto(this._authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(_.findIndex(this.photos, { id: id }), 1);
        this._alertify.success('Photo successfully deleted.');
      }, error => {
        this._alertify.error('Failed to delete.');
      });
    });
  }
}
