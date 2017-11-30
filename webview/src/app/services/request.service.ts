import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

}
