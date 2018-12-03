import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICarBackRes } from '../models/car-back-res';
import { CarService } from '../services/car.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'car-back',
  templateUrl: './car-back.component.html',
  styleUrls: ['./car-back.component.css']
})
export class CarBackComponent implements OnInit {
  private branchID: string | number;
  private carID: string;
  msg: string;
  totPrice: number;

  constructor(private carSer: CarService, private userSer: UserService) { }

  ngOnInit() {
    this.userSer.getUser().subscribe(user => this.branchID = user.BranchID).unsubscribe();
  }

  retCar(carID) {
    if (isNaN(carID) || carID.length !== 7) {
      this.msg = "Input is invalid, please try again";
    }
    else {
      this.carSer.carBack(carID, this.branchID).subscribe(res => {
        const actualEnd = Date.now();
        const _res: ICarBackRes = res[0];
        const dayilyP = _res.DailyPrice;
        const lateP = _res.LatePrice;
        const miliSecInDay = (1000 * 3600 * 24);
        const startDate = (new Date(_res.StartDate)).getTime();
        const endDate = (new Date(_res.EndDate)).getTime();
        const endDiff = actualEnd - endDate;
        const dayDiff = endDate - startDate;
        this.msg = 'Total price is ';
        this.totPrice = (1 + Math.ceil(dayDiff / miliSecInDay)) * dayilyP;
        if (!(endDiff < miliSecInDay))
          this.totPrice += (Math.floor(endDiff / miliSecInDay) * lateP);
      },
        (err: HttpErrorResponse) => {
          this.totPrice = null;
          if (err.status === 400)
            this.msg = 'No such car found in our company, or it has already returned'
          else
            this.msg = 'Something bad happened, please try again later'
        }
      );
    }
  }
}
