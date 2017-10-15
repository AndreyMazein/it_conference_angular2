import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute } from '@angular/router';
import {Participant} from "./participant";
import {DataService } from "./data.service";
import {Group} from "./group";


@Component({
  selector: 'participant-detail-app',
  templateUrl: './participant-detail.component.html',
})

export class ParticipantDetailComponent implements OnInit  {

  private participant: Participant;
  private participants: Participant[];
  private groups: Group[];

  constructor(
    private location: Location,
    private data: DataService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.data.groups.subscribe(groups => {this.groups = groups});
    this.data.participants.subscribe(participant => {
      this.participants = participant;
      var currentUrlId= +this.activatedRoute.snapshot.url[1].path;
      for(var i=0; i<participant.length; i++){
        if(participant[i].id==currentUrlId){
          this.participant=participant[i];
          break
        }
      }
    });
  }

  goBack(): void{
    this.location.back();
  }

  chooseGroup(group: Group):void{
    this.participant.groupID = group.id;
    this.participant.groupName = group.name;
  }

  editParticipant(participant: Participant):void{

    if(participant.name=='' || participant.email==''){
      alert("Please enter name and email");
      return;
    }

    for(var i=0; i<this.participants.length; i++){
      if(this.participants[i].id==participant.id){
        this.participants[i]=participant;
        break
      }
    }
    this.data.setParticipants(this.participants);
  }

}
