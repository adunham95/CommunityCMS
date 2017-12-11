import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private reqService: RequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reqService.getCommmunites().subscribe(data =>{
      let myData;
      myData = data;
      this.communities = myData;
      console.log(this.communities);
    })
  }

  communities;
  loginCommID: String;
  loginPassword: String;
  loginUsername: String;
  stayLoggedIn = false;

  login(){

    const user = {
      communityID: this.loginCommID,
      username: this.loginUsername,
      password: this.loginPassword
    };

    console.log(user);
    let userData;

    this.reqService.authenticateUser(user).subscribe(data =>{
      userData = data;
      console.log(userData);
      if(userData.id != null){
        console.log(this.stayLoggedIn);
        this.reqService.storeUserData(userData, this.stayLoggedIn);
        this.router.navigate(['/']);
      }
      else {
        console.log(userData.msg);
      }
    });

  }
}
