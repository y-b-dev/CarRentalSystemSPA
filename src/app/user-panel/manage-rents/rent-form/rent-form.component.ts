import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { FormControl, FormGroup, ValidationErrors, Validators } from '../../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { IRent } from '../../../models/rent';
import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { RentService } from '../../../services/rent.service';

@Component({
  selector: 'rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit, CanComponentDeactivate {

  aedVal: Date;
  startVal: Date;
  endVal: Date;
  err: string;
  form: FormGroup;
  success: string;
  private submitted: boolean;
  private isEdit: boolean;
  private id;
  private carID;
  private userID;
  private branchID;
  get start() { return this.form.get('StartDate') as FormControl; }
  get end() { return this.form.get('EndDate') as FormControl; }

  constructor(private rentSer: RentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'StartDate': new FormControl(null, Validators.required),
      'EndDate': new FormControl(null, Validators.required),
      'ActualEndDate': new FormControl(null)
    }, this.datesValidation);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (!isNaN(id as any)) {
        this.rentSer.getRentByID(id).subscribe(r => {
          this.id = id;
          this.carID = r.CarID;
          this.userID = r.UserID;
          this.branchID = r.BranchID;
          this.isEdit = true;
          this.startVal = new Date(r.StartDate);
          this.endVal = new Date(r.EndDate);
          this.aedVal = new Date(r.ActualEndDate);
        },
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.err = 'Rent was not found';
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
      this.startVal = this.endVal = this.aedVal = new Date();
    }
  }


  onSubmit() {
    if (!this.err) {
      this.submitted = true;
      const fVal = this.form.value;
      let rent: IRent = {
        StartDate: fVal.StartDate, EndDate: fVal.EndDate, ActualEndDate: fVal.ActualEndDate,
        CarID: this.carID, UserID: this.userID, BranchID: this.branchID
      };
      if (this.isEdit) {
        rent.ID = this.id;
        this.rentSer.updateRent(this.id, rent).subscribe(() => {
          this.success = 'Rent was successfully updated!';
          this.form.reset();
        }, () => { 'Rent was not updated, something went wrong' })
      }
      else {
        this.rentSer.addOrders([rent]).subscribe(() => {
          this.success = 'Rent was successfully added!';
          this.form.reset();
        }, () => { 'Rent was not added, something went wrong' })
      }
    }
  }

  datesValidation(fg: FormGroup): ValidationErrors {
    const s = new Date(fg.get('StartDate').value).getTime();
    const e = new Date(fg.get('EndDate').value).getTime();
    const ae = new Date(fg.get('ActualEndDate').value).getTime();
    console.log(s, e, ae)
    if (e && s && ae) {
      if (!(e > s) || (ae && ae < e))
        return { d: 'Invalid dates, End date should be bigger than start and actual end date should be bigger than end date or empty' }
    }
    return null;
  }

  goBack() {
    this.router.navigate(['user-panel/manage-rents']);
  }

  canDeactivate() {
    if (!this.submitted) {
      return confirm("Are you sure you want to leave before completion?")
    }
    return true;
  }
}
