import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { FormControl, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { GEAR } from '../../../models/car-type';
import { CarTypeService } from '../../../services/car-type.service';
import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';

@Component({
  selector: 'car-type-form',
  templateUrl: './car-type-form.component.html',
  styleUrls: ['./car-type-form.component.css']
})
export class CarTypeFormComponent implements OnInit, CanComponentDeactivate {

  ctGear;
  gears = GEAR;
  err: string;
  form: FormGroup;
  success: string;
  maxYear = new Date().getFullYear();
  private submitted: boolean;
  private isEdit: boolean;
  private id;
  get man() { return this.form.get('Manufactor') as FormControl; }
  get mod() { return this.form.get('Model') as FormControl; }
  get dp() { return this.form.get('DailyPrice') as FormControl; }
  get lp() { return this.form.get('LatePrice') as FormControl; }
  get year() { return this.form.get('Year') as FormControl; }
  get gear() { return this.form.get('Gear') as FormControl; }


  constructor(private ctSer: CarTypeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'Manufactor': new FormControl(null, [Validators.required, Validators.pattern(/^\s*\w+\s*$/)]),
      'Model': new FormControl(null, [Validators.required, Validators.pattern(/^\s*\w+\s*$/)]),
      'DailyPrice': new FormControl(null, [Validators.required, Validators.pattern(/(?:^\s*\d+\s*$)|(?:^\s*\d+\.\d+\s*$)/)]),
      'LatePrice': new FormControl(null, [Validators.required, Validators.pattern(/(?:^\s*\d+\s*$)|(?:^\s*\d+\.\d+\s*$)/)]),
      'Year': new FormControl(null, [Validators.required, Validators.min(this.maxYear - 25),
      Validators.max(this.maxYear), Validators.pattern(/^\s*\d+\s*$/)]),
      'Gear': new FormControl(null, Validators.required)
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (!isNaN(id as any)) {
        this.ctSer.getType(id).subscribe(ct => {
          this.id = id;
          this.ctGear = ct.Gear;
          this.isEdit = true;
          this.form.patchValue(ct);
        },
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.err = 'Car type was not found';
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
  }


  onSubmit() {
    if (!this.err) {
      this.submitted = true;
      const fVal = this.form.value;
      let ct: any = {
        Manufactor: fVal.Manufactor.trim(), Model: fVal.Model.trim(),
        DailyPrice: typeof fVal.DailyPrice === "number" ? fVal.DailyPrice : fVal.DailyPrice.trim(),
        LatePrice: typeof fVal.LatePrice === "number" ? fVal.LatePrice : fVal.LatePrice.trim(),
        Year: typeof fVal.Year === "number" ? fVal.Year : fVal.Year.trim()
      };
      if (this.isEdit) {
        ct.ID = this.id;
        this.ctSer.updateCT(this.id, ct).subscribe(() => {
          this.success = 'Car type was successfully updated!';
          this.form.reset();
        }, () => { 'Car type was not updated, something went wrong' })
      }
      else {
        this.ctSer.addCT(ct).subscribe(() => {
          this.success = 'Car type was successfully added!';
          this.form.reset();
        }, () => { 'Car type was not added, something went wrong' })
      }
    }
  }

  goBack() {
    this.router.navigate(['user-panel/manage-car-types']);
  }

  canDeactivate() {
    if (!this.submitted) {
      return confirm("Are you sure you want to leave before completion?")
    }
    return true;
  }
}
