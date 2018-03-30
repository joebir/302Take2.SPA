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
      this.getMemberPhotoChange.emit(photo.url);                //  <--- Added
    }, error => {
      this._alertify.error(error);
    });
  }

}
