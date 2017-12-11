import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import 'rxjs/add/operator/map'

@Injectable()
export class RequestService {

  constructor(
    private http: HttpClient,
  ) {}

  dev = true;
  jwtHelper: JwtHelper = new JwtHelper();

  urlChecker(url){
    if(this.dev){
      return "http://localhost:8080" + url
    }
    else{
      return url
    }
  }

  registerCommunity(community){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.urlChecker('/community/new'), community, {headers: headers})
  }

  getCommunityByName(communityName){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.urlChecker('/community/profile?name=' + communityName), {headers: headers})
  }

  getCommunityByID(communityID){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.urlChecker('/community/profile?id=' + communityID), {headers: headers})
  }

  registerUser(communityID, houseHoldBody){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.urlChecker('/household/'+communityID+'/register'), houseHoldBody,{headers: headers})
  }

  getCommmunites(){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.urlChecker('/community/profile/all'), {headers: headers})
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.urlChecker('/household/'+user.communityID+'/authentication'), user, {headers: headers})
  }

  getAllUsersInCommunity(communityID){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.urlChecker('/household/'+communityID+'/profile/all'), {headers: headers})
  }

  storeUserData(user, type){
    //IF remember me
    if(type){
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('communityID', user.communityID);
    }
    //If don't remember me
    else {
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('communityID', user.communityID);
    }
    // this.authToken = token;
    // this.user = user;
  }

  getLocalUserData(){
    let userData;
    if(localStorage.getItem('user')){
      console.log("Token in local storeage");
      userData = JSON.parse(localStorage.getItem('user'));
      // userData = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
    }
    else if(sessionStorage.getItem('user')){
      console.log("Token in session storage");
      userData = JSON.parse(sessionStorage.getItem('user'));
      // userData = this.jwtHelper.decodeToken(sessionStorage.getItem('id_token'));
    }
    return userData;
  }

  getCommunityID(){
    let commID;
    if(localStorage.getItem('communityID')){
      console.log("Token in local storeage");
      commID = localStorage.getItem('communityID');
    }
    else if(sessionStorage.getItem('communityID')){
      console.log("Token in session storage");
      commID = sessionStorage.getItem('communityID');
    }
    return commID;
  }

  isLoggedIn(){
    let token;
    let  loggedIn;
    if(localStorage.getItem('user')){
      // console.log("Token in local storeage");
      loggedIn = true;
    }
    else if(sessionStorage.getItem('user')){
      // console.log("Token in session storage");
      loggedIn = true;
    }
    else{
      loggedIn = false;
    }

    return loggedIn;
  }

  logOut(){
    localStorage.clear();
    sessionStorage.clear();
  }

  //Event
  newEvent(event){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.urlChecker('/event/new'), event, {headers: headers})
  }
}
