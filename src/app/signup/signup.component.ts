import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passMatch } from '../functions/password-match';
import { IUser } from '../models/user';
import { CanComponentDeactivate } from '../services/guards/can-deactivate.guard';
import { UserService } from '../services/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, CanComponentDeactivate {

  bsVal: Date;
  form: FormGroup;
  private submitted: boolean;
  private success: boolean;
  err: boolean;
  get username() { return this.form.get('UserName') as FormControl; }
  get password() { return this.form.get('Password') as FormControl; }
  get fName() { return this.form.get('FirstName') as FormControl; }
  get lName() { return this.form.get('LastName') as FormControl; }
  get id() { return this.form.get('UserID') as FormControl; }
  get birth() { return this.form.get('BirthDate') as FormControl; }
  get gender() { return this.form.get('Gender') as FormControl; }
  get email() { return this.form.get('Email') as FormControl; }
  get img() { return this.form.get('Image') as FormControl; }
  get repassword() { return this.form.get('repassword') as FormControl; }

  constructor(private userSer: UserService, private router: Router) {
    this.bsVal = new Date()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'FirstName': new FormControl(null, [Validators.required, Validators.pattern(/^\s*[a-zA-Z]{2,20}\s*$/)]),
      'LastName': new FormControl(null, [Validators.required, Validators.pattern(/^\s*[a-zA-Z]{2,20}\s*$/)]),
      'UserID': new FormControl(null, [Validators.required, Validators.pattern(/\s*^\d{9}\s*$/)]),
      'UserName': new FormControl(null, [Validators.required, Validators.pattern(/^\s*\w{3,20}\s*$/)]),
      'Email': new FormControl(null, [Validators.required, Validators.email]),
      'BirthDate': new FormControl(null),
      'Gender': new FormControl(null, Validators.required),
      'Image': new FormControl(null),
      'Password': new FormControl(null, [Validators.required, Validators.pattern(/^\s*\w{6,20}\s*$/)]),
      'repassword': new FormControl(null, Validators.required)
    }, passMatch);
  }

  onSubmit() {
    const formVal = this.form.value;
    const user: IUser = {
      FirstName: formVal.FirstName.trim(), LastName: formVal.LastName.trim(), UserID: formVal.UserID.trim(), UserName: formVal.UserName.trim(),
      Password: formVal.Password.trim(), BirthDate: formVal.BirthDate, Gender: formVal.Gender, Email: formVal.Email.trim(), Image: formVal.Image.trim()
    }
    this.submitted = true;
    this.userSer.addUser(user).subscribe(() => {
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2200)
    },
      () => {
        this.err = true;
        setTimeout(() => {
          this.err = false;
        }, 3000)
      });
  }

  canDeactivate() {
    if (!this.submitted) {
      return confirm("Are you sure you want to leave before completion?")
    }
    return true;
  }
}
