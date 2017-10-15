import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Participant} from "./participant";
import {DataService } from "./data.service";
import {Group} from "./group";

@Component({
  selector: 'group-detail-app',
  templateUrl: './group-detail.component.html',
})

export class GroupDetailComponent implements OnInit  {

  private participants: Participant[];
  private groups: Group[];
  private currentGroup: Group;
  private participantsOfCurrentGroup: Participant[];
  private otherParticipants: Participant [];
  private NewCurrentGroupName: string;
  private NewCurrentGroupDescription: string;

  constructor(private data: DataService, private location: Location ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.data.groups.subscribe(groups => {this.groups = groups;
      var currentUrlId= +this.activatedRoute.snapshot.url[1].path;
      for(var i=0; i<groups.length; i++){
        if(groups[i].id==currentUrlId){
          this.currentGroup=groups[i];
          this.NewCurrentGroupDescription=this.currentGroup.description;
          this.NewCurrentGroupName=this.currentGroup.name;
          break;
        }
      }
    });
    this.data.participants.subscribe(participant => {this.participants = participant;});
  }


  addToCurrentGroup(participant: Participant): void{
    this.participantsOfCurrentGroup.push(participant);
    this.otherParticipants = this.otherParticipants.filter(p=> p   != participant);
  }

  deleteFromCurrentGroup(participant: Participant): void{
    this.participantsOfCurrentGroup = this.participantsOfCurrentGroup.filter(p=> p != participant);
    this.otherParticipants.push(participant);
  }

  openModalAddtoGroup(): void{

    this.participantsOfCurrentGroup = this.participants.filter(p=> p.groupID == this.currentGroup.id);
    this.otherParticipants = this.participants.filter(p=> p.groupID != this.currentGroup.id);
    this.canselChangesOfGroup();
  }

  openModalEditGroup(): void{
    this.cancelAddingOperation();
  }

  goBack(): void{
    this.location.back();
  }

  canselChangesOfGroup():void{
    this.NewCurrentGroupName=this.currentGroup.name;
    this.NewCurrentGroupDescription = this.currentGroup.description;
  }

  cancelAddingOperation(): void{
    this.participantsOfCurrentGroup=null;
    this.otherParticipants=null;
  }

  applyChangesOfGroup(newGroupAttr: any):void{
    this.currentGroup.name=newGroupAttr.name;
    this.currentGroup.description=newGroupAttr.description;
    for(var i=0; i<this.groups.length; i++){
      if(this.groups[i].id==this.currentGroup.id){
        this.groups[i]=this.currentGroup;
        break;
      }
    }
    for (var i=0; i<this.participants.length; i++){
      if(this.participants[i].groupID==this.currentGroup.id){
        this.participants[i].groupName=this.currentGroup.name;
      }
    }
    this.data.setGroup(this.groups);
    this.data.setParticipants(this.participants);
  }

  aplyAddingOperation(): void{

    for(var i=0; i<this.participantsOfCurrentGroup.length; i++){
      this.participantsOfCurrentGroup[i].groupID=this.currentGroup.id;
      this.participantsOfCurrentGroup[i].groupName=this.currentGroup.name;
    }

    for(var i=0; i<this.otherParticipants.length;i++){
      if(this.otherParticipants[i].groupID==this.currentGroup.id){
        this.otherParticipants[i].groupName='none';
        this.otherParticipants[i].groupID=0;
      }
    }

    for(var i=0; i<this.participantsOfCurrentGroup.length; i++){
      for (var j=0; j<this.participants.length; j++){
        if(this.participantsOfCurrentGroup[i].id==this.participants[j].id){
          this.participants[j]=this.participantsOfCurrentGroup[i];
        }
      }
    }

    for(var i=0; i<this.otherParticipants.length; i++){
      for (var j=0; j<this.participants.length; j++){
        if(this.otherParticipants[i].id==this.participants[j].id){
          this.participants[j]=this.otherParticipants[i];
        }
      }
    }


    this.data.setParticipants(this.participants);
    this.participantsOfCurrentGroup=null;
    this.otherParticipants=null;

  }
}
