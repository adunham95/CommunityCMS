import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'events-card',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Input() type: String;

  constructor() { }

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

}
