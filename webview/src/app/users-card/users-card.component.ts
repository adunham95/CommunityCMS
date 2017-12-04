import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss']
})
export class UsersCardComponent implements OnInit {

  @Input() type: String;
  @Input() users;

  constructor(
  ) { }

  ngOnInit() {
    if(this.type === 'main'){
      this.main = true
    }
    else if(this.type == 'sidebar'){
      this.sidebar = true
    }
  }



  displayedColumns = ['name'];
  // users;
  main;
  sidebar;
}
