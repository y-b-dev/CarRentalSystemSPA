import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../models/employee';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {

  user: IUser | IEmployee;
  isCollapsed: boolean;

  constructor(private userSer: UserService, private router: Router) { }

  ngOnInit() {
    this.isCollapsed = true;
    this.userSer.getUser().subscribe(
      user => this.user = user
    );
  }

  logout() {
    this.router.navigate(['/home']);
    this.userSer.logout();
  }
}
