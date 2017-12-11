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
    let commID = this.reqService.getCommunityID();


    console.log(this.currentUser);
    this.getUsers();
    let community;
    this.reqService.getCommunityByID(commID).subscribe(data=>{
      community = data;
      this.community = community;
      console.log(this.community);
    });
    this.isDataAvailable = true;
  }

  getUsers(){
    let houseHolds;
    this.reqService.getAllUsersInCommunity(this.reqService.getCommunityID()).subscribe(data=>{
      houseHolds = data;
      this.users = houseHolds;
      console.log(this.users);
    });
  }

  isDataAvailable: boolean;
  community;
  currentUser;
  users;
}
