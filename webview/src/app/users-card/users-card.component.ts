import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../services/request.service";

@Component({
  selector: 'users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss']
})
export class UsersCardComponent implements OnInit {

  @Input() type: String;

  constructor(
    private reqService: RequestService
  ) { }

  ngOnInit() {
    let user;
    let houseHolds;
    user = this.reqService.getLocalUserData();
    console.log(user);
    this.reqService.getAllUsersInCommunity(user.communityID).subscribe(data=>{
      console.log(data);
      houseHolds = data;
      this.users = houseHolds.Households;
      console.log(this.users)
    });
    if(this.type === 'main'){
      this.main = true
    }
    else if(this.type == 'sidebar'){
      this.sidebar = true
    }
  }



  displayedColumns = ['name'];
  users;
  main;
  sidebar;
}
