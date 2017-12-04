import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {Router} from "@angular/router";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private reqService: RequestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  title = 'Skyline CRM';

  logout(){
    this.reqService.logOut();
    this.router.navigate(['/login']);
  }

}
