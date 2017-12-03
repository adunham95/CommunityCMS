import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

  constructor() {
  }

  validateCommunity(community){
    if (community.name == undefined || community.state == undefined || community.city == undefined) {
      return false
    }
    else {
      return true
    }
  }

  validateHouseHold(household) {
    if (household.name == undefined || household.email == undefined || household.username == undefined || household.password == undefined) {
      console.log("Not valid");
      return false
    }
    else {
      if(household.password === 'password' || household.password === 'Password'){
        console.log("Use a stronger password");
        return false
      }
      else{
        return true
      }
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
