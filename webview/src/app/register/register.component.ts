import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {ValidatorService} from "../services/validator.service";
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private reqService: RequestService,
    private validateService: ValidatorService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.states = this.dataService.states()
  }

  states = [];

  //Community Info
  communityName: String;
  communityState: String;
  communityCity: String;

  //Household Info
  name: String;
  email: String;
  username: String;
  password: String;
  admin: boolean;

  createAccount() {
    this.admin = true;

    let communityBody = {
      "name": this.communityName,
      "city": this.communityCity,
      "state": this.communityState
    };
    console.log(communityBody);
    let householdBody = {
      "name": this.name,
      "admin": this.admin,
      "communityID": '',
      "email": this.email,
      "username": this.username,
      "password": this.password
    };
    console.log(householdBody);
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
        this.reqService.getCommunityByName(this.communityName).subscribe(data =>{
          communityInfo = data;
          if(communityInfo.success){
            console.log(communityInfo.community);
            householdBody.communityID = communityInfo.community.id;
            console.log(householdBody);
            //Registers the household with communityID
            this.reqService.registerUser(communityInfo.community.id, householdBody).subscribe(data =>{
              houseHoldReturn = data;
              if(houseHoldReturn.success){
                console.log("Household registered");
                this.router.navigate(['/login']);
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
