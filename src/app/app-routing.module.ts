import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParticipantComponent }   from './participant.component';
import { GroupsComponent }      from './groups.component';
import { ParticipantDetailComponent} from './participant-detail.component'
import {GroupDetailComponent} from './group-detail.component'

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users',  component: ParticipantComponent },
  { path: 'groups',  component: GroupsComponent },
  { path: 'users/:id', component: ParticipantDetailComponent },
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: '**', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

