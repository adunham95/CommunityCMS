import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {ValidatorService} from "../services/validator.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private reqService: RequestService,
    private validateService: ValidatorService
  ) { }

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
    let householdBody = {
      "name": this.name,
      "admin": this.admin,
      "email": this.email,
      "username": this.username,
      "password": this.password
    };
    let registerReturn;
    let communityInfo;
    let houseHoldReturn;

    //Validates Community Data
    if(!this.validateService.validateCommunity(communityBody)){
      console.log("All community data not provided")
    }

    //Validate Household data
    if(!this.validateService.validateHouseHold(householdBody)){
      console.log("Not all household data provided");
      return false
    }

    // Validate Email
    if(!this.validateService.validateEmail(householdBody.email)){
      return false
    }


    //Registers community with the server
    this.reqService.registerCommunity(communityBody).subscribe(data => {
      registerReturn = data;
      if(registerReturn.success == true){
        //If Registered retrieve the community info
        this.reqService.getCommunity(this.communityName).subscribe(data =>{
          communityInfo = data;
          if(communityInfo.success){
            console.log(communityInfo.community);
            console.log(householdBody);
            //Registers the household with communityID
            this.reqService.registerUser(communityInfo.community.id, householdBody).subscribe(data =>{
              houseHoldReturn = data;
              if(houseHoldReturn.success){
                console.log("Household registered")
              }
              else{
                console.log(houseHoldReturn.msg);
                console.log(houseHoldReturn.error);
              }
            })
          }
          else{console.log(communityInfo.msg)}
        })
      }
      else{console.log(registerReturn.msg)}
    });
  }
}
