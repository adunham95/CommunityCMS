import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";

@Component({
  selector: 'users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss']
})
export class UsersCardComponent implements OnInit {

  constructor(
    private reqService: RequestService
  ) { }

  ngOnInit() {
    let user;
    user = this.reqService.getLocalUserData();
    console.log(user);
    this.reqService.getAllUsersInCommunity(user.communityID).subscribe(data=>{
      console.log(data);
      this.users = data.Households;
      console.log(this.users)
    });
  }

  users;
}
