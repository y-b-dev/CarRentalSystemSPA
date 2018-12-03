import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { IUser } from '../../models/user';
import { EmployeeService } from '../../services/employee.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  private branchID;
  users: IUser[] = [];
  employees: IUser[] = [];
  private err: boolean;
  sel: boolean;
  private errOnAction: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private userSer: UserService, private empSer: EmployeeService) { }

  ngOnInit() {
    this.userSer.getUser().subscribe(user => {
      this.branchID = user.BranchID;
    }).unsubscribe();
    this.userSer.getUsersAndEmps(this.branchID).subscribe(u => {
      this.users = u[0].sort((a, b) => a.UserID - b.UserID);
      this.employees = u[1].sort((a, b) => a.UserID - b.UserID);
    },
      () => {
        this.err = true;
      })
  }

  makeEmp(e) {
    if (confirm("Are you sure you want to turn this user to employee?")) {
      this.empSer.addEmployee({ UserID: e[0], IsManager: false, BranchID: this.branchID }).subscribe(() => {
        this.errOnAction = false;
        const u = this.users.splice(e[1], 1);
        this.users = this.users.splice(0)
        this.employees = this.employees.concat(u).sort((a, b) => a.UserID - b.UserID);
      }, () => {
        this.errOnAction = true;
      })
    }
  }

  makeUser(e) {
    if (confirm("Are you sure you want to turn employee to regular user?")) {
      this.empSer.delEmployee(e[0]).subscribe(() => {
        this.errOnAction = false;
        const em = this.employees.splice(e[1], 1);
        this.employees = this.employees.splice(0)
        this.users = this.users.concat(em).sort((a, b) => a.UserID - b.UserID);
      }, () => {
        this.errOnAction = true;
      })
    }
  }

  onEdit(id) {
    this.router.navigate(['edit/' + id], { relativeTo: this.route })
  }

  onDelete(e) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userSer.delUser(e[1]).subscribe(() => {
        this.errOnAction = false;
        if (e[0]) {
          this.users.splice(e[2], 1)
          this.users = this.users.splice(0);
        }
        else {
          this.employees.splice(e[2], 1)
          this.employees = this.employees.splice(0);
        }
      }), () => {
        this.errOnAction = true;
      }
    }
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route })
  }

}
