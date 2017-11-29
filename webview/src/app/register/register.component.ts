import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private reqSerice: RequestService) { }

  ngOnInit() {
  }

  communityName: String;
  name: String;
  email: String;
  username: String;
  password: String;
  admin: boolean;

  createAccount() {
    this.admin = true;
    console.log("community name: " + this.communityName);
    console.log("name: " + this.name);
    console.log("email: " + this.email);
    console.log("username: " + this.username);
    console.log("password: " + this.password);
    console.log("admin: " + this.admin);

    let communityBody = {"name": this.communityName};
    let myData;

    //TODO validate data

    this.reqSerice.registerCommunity(communityBody).subscribe(data => {
      myData = data;
      if(myData.success == true){

      }
      else{
        console.log(myData.msg)
      }
    });
  }
}
