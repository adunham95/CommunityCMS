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

  errorMessage;

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
    let houseHoldReturn;

    //Validates Community Data
    if(!this.validateService.validateCommunity(communityBody)){
      this.errorMessage = "All community data not provided";
      console.log(this.errorMessage)
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
      console.log(registerReturn);
      if(registerReturn.id !=null){
        householdBody.communityID = registerReturn.id;

        this.reqService.registerUser(registerReturn.id, householdBody).subscribe(data =>{
          houseHoldReturn = data;
          if(houseHoldReturn.id !=null){
            console.log("Household registered");
            this.router.navigate(['/login']);
          }
          else{
            console.log(houseHoldReturn.msg);
            console.log(houseHoldReturn.error);
          }
        })
      }
      else{console.log(registerReturn.msg)}
    });
  }
}
