import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {

  @Input() users;

  constructor() { }

  ngOnInit() {
    this.userCount = this.users.length;
  }

  userCount;
}
