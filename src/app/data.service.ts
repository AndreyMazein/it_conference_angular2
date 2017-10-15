import { Injectable } from '@angular/core';

import { Group } from './group';
import { GROUPS } from './mock-groups';
import { PARTICIPANT } from './mock-participant';
import { Participant } from './participant';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private participiantsOdsev = new BehaviorSubject<Participant []>(PARTICIPANT);
  private groupsOdsev = new BehaviorSubject<Group []>(GROUPS);

  participants = this.participiantsOdsev.asObservable();
  groups = this.groupsOdsev.asObservable();

  setParticipants(newPartisipants: Participant []){
    this.participiantsOdsev.next(newPartisipants);
  }
  setGroup(newGroups: Group[]){
    this.groupsOdsev.next(newGroups);
  }

}
