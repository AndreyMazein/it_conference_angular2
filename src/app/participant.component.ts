import {Component, OnInit} from '@angular/core';
import {Participant} from "./participant";
import { DataService } from "./data.service";
import {Group} from "./group";


@Component({
  selector: 'participant-app',
  templateUrl: './participant.component.html',
})

export class ParticipantComponent implements OnInit  {

  private participants: Participant[];
  private groups: Group[];
  private newParticipant_id: string;
  private newParticipant_name: string;
  private newParticipant_surname: string;
  private newParticipant_email: string;
  private newParticipant_phone: string;
  private selectedGroup: Group;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.participants.subscribe(participant => {this.participants = participant});
    this.data.groups.subscribe(groups => {this.groups = groups});
    this.selectedGroup = {id: 0, name: "none", description: "none"};
  }

  deleteParicipants(participant: Participant): void {
    this.participants=this.participants.filter(p=> p != participant);
    this.data.setParticipants(this.participants);
  }

  chooseGroup(group: Group):void{
    this.selectedGroup = group;
  }

  canselAdding():void{
    this.newParticipant_id="";
    this.newParticipant_name="";
    this.newParticipant_surname="";
    this.newParticipant_email="";
    this.newParticipant_phone="";
    this.selectedGroup = {id: 0, name: "none", description: "none"};
  }

  addNewParticipant(participant: Participant): void{
    if(Number.isInteger(Number(participant.id))){

      for(var i=0; i<this.participants.length; i++){
        if(this.participants[i].id==participant.id){
          alert("Participant with ID " + participant.id + "already exist, please try again");
          return;
        }
      }

      this.participants.push(participant);
      this.data.setParticipants(this.participants);
      this.canselAdding();

    } else {
      alert("ID of new partisipant is not an integer");
    }
  }
}
