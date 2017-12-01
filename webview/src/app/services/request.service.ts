import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tokenNotExpired} from "angular2-jwt"

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) {}

  dev = true;

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

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // this.authToken = token;
    // this.user = user;
  }

  isLoggedIn(){
    return tokenNotExpired('id_token');
  }

}
