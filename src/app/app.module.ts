import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { GroupsComponent }  from './groups.component';
import {GroupDetailComponent} from './group-detail.component'
import { ParticipantComponent }  from './participant.component';
import { ParticipantDetailComponent } from './participant-detail.component'
import { DataService}  from './data.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule],
  declarations: [ AppComponent, GroupsComponent, ParticipantComponent, ParticipantDetailComponent, GroupDetailComponent ],
  providers: [ DataService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
