import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../services/request.service";

@Component({
  selector: 'profile-card',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() currentUser: any;

  constructor(
  ) { }

  ngOnInit() {

  }
}
