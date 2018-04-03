import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { FollowersComponent } from "./followers/followers.component";
import { AuthGuard } from "./guards/auth.guard";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberDetailResolver } from "./resolvers/member-detail.resolver";
import { MemberListResolver } from "./resolvers/member-list.resolver";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberEditResolver } from "./resolvers/member-edit.resolver";
import { PreventUnsavedChanges } from "./guards/prevent-unsaved-changes.guard";
import { FollowersResolver } from "./resolvers/followers.resolver";

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver }},
            { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver }},
            { path: 'member/edit', component: MemberEditComponent,
                resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent },
            { path: 'followers', component: FollowersComponent, resolve: { users: FollowersResolver } },
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];