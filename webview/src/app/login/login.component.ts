import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private reqService: RequestService,
  ) { }

  ngOnInit() {
    this.reqService.getCommmunites().subscribe(data =>{
      let myData;
      myData = data;
      this.communities = myData.communities;
      console.log(this.communities);
    })
  }

  communities;
  loginCommID: String;
  loginPassword: String;
  loginUsername: String;

  login(){
    console.log(this.loginCommID);
    console.log(this.loginUsername);
    console.log(this.loginPassword);
  }
}
