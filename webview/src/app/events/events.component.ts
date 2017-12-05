import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../services/request.service";

@Component({
  selector: 'events-card',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Input() type: String;
  @Input() community;

  constructor(
    private reqService: RequestService,
  ) { }

  ngOnInit() {
    if(this.type === 'main'){
      this.main = true
    }
    else if(this.type == 'sidebar'){
      this.sidebar = true
    }
    this.events = [
      {
        'name': 'Event One',
        'date': '1/2/34'
      },
      {
        'name': 'Event Two',
        'date': '1/2/34'
      }
    ]
  }
  main;
  sidebar;

  events;

  //New Event
  eventName;
  eventDate;
  eventDescription;

  newEvent(){
    let currentUser = this.reqService.getLocalUserData();

    let event = {
      "name": this.eventName,
      "communityID": currentUser.communityID,
      "description": this.eventDescription,
      "startDate": this.eventDate,
      "createdByID": currentUser._id
    };

    console.log(event);
    let newData;
    this.reqService.newEvent(event).subscribe(data => {
      newData = data;
      if(newData.success){
        console.log(newData)
      }
      else{
        console.log(newData)
      }
    })
  }


}
