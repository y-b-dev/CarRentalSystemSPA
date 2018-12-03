import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { FormControl, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { ICarType } from '../../../models/car-type';
import { CarTypeService } from '../../../services/car-type.service';
import { CarService } from '../../../services/car.service';
import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit, CanComponentDeactivate {

  err: string;
  form: FormGroup;
  types: ICarType[];
  success: string;
  private branchID;
  private submitted: boolean;
  private isEdit: boolean;
  private id;
  get carID() { return this.form.get('CarID') as FormControl; }
  get km() { return this.form.get('KM') as FormControl; }
  get img() { return this.form.get('Image') as FormControl; }
  get isD() { return this.form.get('IsDriveable') as FormControl; }
  get isA() { return this.form.get('IsAvailable') as FormControl; }
  get ct() { return this.form.get('CarTypeID') as FormControl; }


  constructor(private ctSer: CarTypeService, private userSer: UserService, private carSer: CarService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'CarID': new FormControl(null, [Validators.required, Validators.pattern(/^\s*\d{7}\s*$/)]),
      'KM': new FormControl(null, [Validators.required, Validators.pattern(/(?:^\s*\d+\s*$)|(?:^\s*\d+\.\d+\s*$)/)]),
      'Image': new FormControl(null, [Validators.required, Validators.pattern(/^\s*https?:\/\/.+\.(?:png)|(?:jpg)|(?:ico)\s*$/i)]),
      'IsDriveable': new FormControl(null, Validators.required),
      'IsAvailable': new FormControl(null, Validators.required),
      'CarTypeID': new FormControl(null, Validators.required)
    });
    this.userSer.getUser().subscribe(user => this.branchID = user.BranchID).unsubscribe();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (!isNaN(id as any)) {
        this.carSer.getCarByID(id).subscribe(car => {
          if (car.BranchID === this.branchID) { //Protection so manager won't edit car from another branch even if he types the correct id
            this.id = id;
            this.isEdit = true;
            this.form.patchValue(car);
          }
          else {
            this.err = 'Car was not found';
          }
        },
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.err = 'Car was not found';
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

    this.ctSer.getTypes().subscribe(t => {
      this.types = t
    }, () => this.err = 'Something bad happend, pleaes try again later')
  }


  onSubmit() {
    if (!this.err) {
      this.submitted = true;
      const fVal = this.form.value;
      let car: any = {
        CarID: typeof fVal.CarID === "number" ? fVal.CarID : fVal.CarID.trim(),
        KM: typeof fVal.KM === "number" ? fVal.KM : fVal.KM.trim(), Image: fVal.Image.trim()
      };
      car.BranchID = this.branchID;
      if (this.isEdit) {
        car.ID = this.id;
        this.carSer.updateCar(this.id, car).subscribe(() => {
          this.success = 'Car was successfully updated!';
          this.form.reset();
        }, () => { 'Car was not updated, something went wrong' })
      }
      else {
        this.carSer.addCar(car).subscribe(() => {
          this.success = 'Car was successfully added!';
          this.form.reset();
        }, () => { 'Car was not added, something went wrong' })
      }
    }
  }

  goBack() {
    this.router.navigate(['user-panel/manage-cars']);
  }

  canDeactivate() {
    if (!this.submitted) {
      return confirm("Are you sure you want to leave before completion?")
    }
    return true;
  }
}
