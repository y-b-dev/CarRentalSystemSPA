import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../models/employee';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isNotUser: boolean;
  private goto: string;

  get username(): AbstractControl { return this.form.get('username'); }
  get password(): AbstractControl { return this.form.get('password'); }

  constructor(private userSer: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.pattern(/^\w{3,20}$/)]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,20}$/)]),
      'check': new FormControl(null)
    })
    this.goto = this.route.snapshot.queryParamMap.get('goto') || '/user-panel';
  }

  onSubmit() {
    if (this.form.valid) {
      this.userSer.auth({ username: this.username.value, password: this.password.value })
        .subscribe(
          (user: IEmployee | IUser) => {
            this.userSer.login(user, this.form.get('check').value);
            this.form.reset();
            this.router.navigate([this.goto]);
          },
          () => this.isNotUser = true
        );
    }
  }
}
