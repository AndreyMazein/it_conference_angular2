import {Component, OnInit} from '@angular/core';
import {Participant} from "./participant";
import { DataService } from "./data.service";
import {Group} from "./group";


@Component({
  selector: 'Group-app',
  templateUrl: './groups.component.html',
})

export class GroupsComponent implements OnInit  {

  private participants: Participant[];
  private groups: Group[];
  private newGroup_id: string;
  private newGroup_name: string;
  private newGroup_description: string;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.participants.subscribe(participant => {this.participants = participant});
    this.data.groups.subscribe(groups => {this.groups = groups});
  }

  deleteGroup(group: Group): void {
    this.groups=this.groups.filter(g=> g != group);
    this.data.setGroup(this.groups);
    for(var i =0; i<this.participants.length; i++){
      if(this.participants[i].groupID==group.id){
        this.participants[i].groupID=0;
        this.participants[i].groupName="none"
      }
    }
  }

  cancelAdding(): void {
    this.newGroup_id="";
    this.newGroup_name="";
    this.newGroup_description="";
  }

  addNewGroup(group: Group): void{

    if(Number.isInteger(Number(group.id))){

      for(var i=0; i<this.groups.length; i++){
        if(this.groups[i].id==group.id){
          alert("Participant with ID " + group.id + "already exist, please try again");
          return;
        }
      }

      this.groups.push(group);
      this.data.setGroup(this.groups);
      this.cancelAdding();

    } else {
      alert("ID of new partisipant is not an integer");
    }
  }
}

