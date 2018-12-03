import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { FormControl, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { passMatch } from '../../../functions/password-match';
import { IUser } from '../../../models/user';
import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {

  err: string;
  form: FormGroup;
  success: string;
  private branchID;
  private submitted: boolean;
  private isEdit: boolean;
  private _id;
  genderVal;
  bsVal: Date;
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

  constructor(private userSer: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'FirstName': new FormControl(null, [Validators.required, Validators.pattern(/^\s*[a-zA-Z]{2,20}\s*$/)]),
      'LastName': new FormControl(null, [Validators.required, Validators.pattern(/^\s*[a-zA-Z]{2,20}\s*$/)]),
      'UserID': new FormControl(null, [Validators.required, Validators.pattern(/\s*^\d{9}\s*$/)]),
      'UserName': new FormControl(null, [Validators.required, Validators.pattern(/^\s*\w{3,20}\s*$/)]),
      'Email': new FormControl(null),
      'BirthDate': new FormControl(null),
      'Gender': new FormControl(null, Validators.required),
      'Image': new FormControl(null),
      'Password': new FormControl(null, [Validators.required, Validators.pattern(/^\s*\w{6,20}\s*$/)]),
      'repassword': new FormControl(null, Validators.required)
    }, passMatch);

    this.userSer.getUser().subscribe(user => this.branchID = user.BranchID).unsubscribe();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (!isNaN(id as any)) {
        let e;
        this.userSer.getUserOrEmp(id, this.branchID).subscribe(u => {
          const b = u.BranchID;
          if (b === null || b === this.branchID) { //Protection so manager won't edit car from another branch even if he types the correct id
            this._id = id;
            this.isEdit = true;
            this.email.clearValidators();
            this.form.patchValue(u);
            this.repassword.patchValue(u.Password);
            this.genderVal = u.Gender;
            this.bsVal = new Date(u.BirthDate);
          }
          else {
            this.err = 'User was not found';
          }
        },
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.err = 'User was not found';
            }
            else {
              this.err = 'Something bad happend, pleaes try again later';
            }
          })
      }
      else {
        this.err = 'Invalid request';
      }
    }
    else {
      this.bsVal = new Date();
    }
    this.email.setValidators([Validators.required, Validators.email])
  }

  onSubmit() {
    if (!this.err) {
      this.submitted = true;
      const formVal = this.form.value;
      let user: IUser = {
        FirstName: formVal.FirstName.trim(), LastName: formVal.LastName.trim(),
        UserID: typeof formVal.UserID === "number" ? formVal.UserID : formVal.UserID.trim(),
        UserName: formVal.UserName.trim(),
        Password: typeof formVal.Password === "number" ? formVal.Password : formVal.Password.trim(),
        BirthDate: formVal.BirthDate, Gender: formVal.Gender,
        Email: formVal.Email.trim(),
        Image: formVal.Image ? formVal.Image.trim() : null
      }
      if (this.isEdit) {
        user.ID = this._id;
        this.userSer.updateUser(this._id, user).subscribe(() => {
          this.success = 'User was successfully updated!';
          this.form.reset();
        }, () => { 'User was not updated, something went wrong' })
      }
      else {
        this.userSer.addUser(user).subscribe(() => {
          this.success = 'User was successfully added!';
          this.form.reset();
        }, () => { 'User was not added, something went wrong' })
      }
    }
  }

  goBack() {
    this.router.navigate(['user-panel/manage-users']);
  }

  canDeactivate() {
    if (!this.submitted) {
      return confirm("Are you sure you want to leave before completion?")
    }
    return true;
  }
}


