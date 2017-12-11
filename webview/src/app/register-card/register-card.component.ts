import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RequestService} from "../services/request.service";
import {ValidatorService} from "../services/validator.service";
import {FormControl, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {

  @Output() reloadUsers = new EventEmitter<String>();

  constructor(
    private reqService: RequestService,
    private valService: ValidatorService,
  ) { }


  ngOnInit() {
  }


  // newUser = new FormGroup({
  //   name: new FormControl(),
  //   email: new FormControl(),
  //   username: new FormControl(),
  //   password: new FormControl(),
  //   admin: new FormControl()
  // });

  name: String;
  email: String;
  username: String;
  password: String;
  admin: boolean;

  createAccount(form: NgForm) {
    let currentUser = this.reqService.getLocalUserData();
    // console.log(currentUser)

    //If admin is not checked sets admin to false
    if(this.admin == undefined){
      this.admin = false;
    }

    let householdBody = {
      "name": this.name,
      "admin": this.admin,
      "communityID": currentUser.communityID,
      "email": this.email,
      "username": this.username,
      "password": this.password
    };

    console.log(householdBody);

    if(this.valService.validateHouseHold(householdBody) == false){
      return
    }

    let houseHoldReturn;
    this.reqService.registerUser(currentUser.communityID, householdBody).subscribe(data =>{
      houseHoldReturn = data;
      console.log(houseHoldReturn);
      if(houseHoldReturn.id != null){
        console.log("Household registered");
        this.name = "";
        this.admin = false;
        this.email = "";
        this.username = "";
        this.password = "";
        form.reset();
        this.reloadUsers.emit("Reload");

      }
      else{
        console.log(houseHoldReturn.msg);
        console.log(houseHoldReturn.error);
      }
    });
  }

}
