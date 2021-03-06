import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './home/register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { FollowersComponent } from './followers/followers.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { BsDropdownModule, TabsModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { AlertifyService } from './services/alertify.service';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FollowersResolver } from './resolvers/followers.resolver';
import { MessagesResolver } from './resolvers/message.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    FollowersComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxGalleryModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:5000']
      }
    }),
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    MemberDetailResolver,
    MemberListResolver,
    ErrorInterceptorProvider,
    AlertifyService,
    MemberEditResolver,
    PreventUnsavedChanges,
    FollowersResolver,
    MessagesResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
