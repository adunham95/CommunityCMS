import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelper, tokenNotExpired} from "angular2-jwt"

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

  getCommunity(communityName){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.urlChecker('/community/profile/' + communityName), {headers: headers})
  }

  registerUser(communityID, houseHoldBody){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.urlChecker('/household/'+communityID+'/register'), houseHoldBody,{headers: headers})
  }

  getCommmunites(){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.urlChecker('/community/all'), {headers: headers})
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.urlChecker('/household/'+user.communityID+'/authentication'), user, {headers: headers})
  }

  getAllUsersInCommunity(communityID){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.urlChecker('/household/'+communityID+'/members'), {headers: headers})
  }

  storeUserData(token, user, type){
    //IF remember me
    if(type){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    //If don't remember me
    else {
      sessionStorage.setItem('id_token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    // this.authToken = token;
    // this.user = user;
  }

  getLocalUserData(){
    let userData;
    if(localStorage.getItem('id_token')){
      console.log("Token in local storeage");
      userData = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
    }
    else if(sessionStorage.getItem('id_token')){
      console.log("Token in session storage");
      userData = this.jwtHelper.decodeToken(sessionStorage.getItem('id_token'));
    }
    return userData.data;
  }

  isLoggedIn(){
    let token;
    let  loggedIn;
    if(localStorage.getItem('id_token')){
      console.log("Token in local storeage");
      token = localStorage.getItem('id_token');
      //If the token id not expired return true
      loggedIn = (!this.jwtHelper.isTokenExpired(token));
    }
    else if(sessionStorage.getItem('id_token')){
      console.log("Token in session storage");
      token = sessionStorage.getItem('id_token');
      //If the token id not expired return true
      loggedIn = (!this.jwtHelper.isTokenExpired(token));
    }
    else{
      console.log("Not logged in");
      loggedIn = false;
    }

    return loggedIn;
  }

}
