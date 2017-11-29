import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  communityName: String;
  name: String;
  email: String;
  username: String;
  password: String;
  admin: boolean;

  createAccount() {
    this.admin = true;
    console.log("community name: " + this.communityName);
    console.log("name: " + this.name);
    console.log("email: " + this.email);
    console.log("username: " + this.username);
    console.log("password: " + this.password);
    console.log("admin: " + this.admin);

  }
}
