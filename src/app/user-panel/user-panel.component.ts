import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../models/employee';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  user: IEmployee | IUser;
  suffix: string;

  constructor(private userSer: UserService) { }

  ngOnInit() {
    let u;
    this.userSer.getUser().subscribe(user => {
      u = this.user = user;
    }).unsubscribe();
    this.suffix = u.Gender === 0 ? "Mr." : u.Gender === 1 ? "Ms." : "Dear";
  }
}
