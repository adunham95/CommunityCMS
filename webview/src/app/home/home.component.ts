import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private reqService: RequestService
  ) { }

  ngOnInit() {
    this.isDataAvailable = false;
    this.currentUser = this.reqService.getLocalUserData();

    let houseHolds;
    let community;
    this.reqService.getAllUsersInCommunity(this.currentUser.communityID).subscribe(data=>{
      houseHolds = data;
      this.users = houseHolds.Households;
      console.log(this.users);
    });
    this.reqService.getCommunityByID(this.currentUser.communityID).subscribe(data=>{
      community = data;
      this.community = community.community;
      console.log(this.community);
    });
    this.isDataAvailable = true;
  }

  isDataAvailable: boolean;
  community;
  currentUser;
  users;
}
