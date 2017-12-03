import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";

@Component({
  selector: 'profile-card',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private reqService: RequestService
  ) { }

  ngOnInit() {
    this.currentUser = this.reqService.getLocalUserData()
  }

  currentUser;
}
