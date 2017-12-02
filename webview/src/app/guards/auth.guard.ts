import { Injectable } from '@angular/core';
import {Router, CanActivate} from "@angular/router";
import {RequestService} from "../services/request.service";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(
    private reqService: RequestService,
    private router: Router
  ) { }

  canActivate() {
    if(localStorage.getItem('id_token') || sessionStorage.getItem('id_token') ){
      return true
    }
    else {
      this.router.navigate(['/login']);
      return false
    }
  }

}
