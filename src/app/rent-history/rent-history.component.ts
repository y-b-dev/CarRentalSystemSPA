import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRent } from '../models/rent';
import { CarService } from '../services/car.service';
import { RentService } from '../services/rent.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'rent-history',
  templateUrl: './rent-history.component.html',
  styleUrls: ['./rent-history.component.css']
})
export class RentHistoryComponent implements OnInit {

  private userID: number;
  car;
  showDetail: boolean;
  rents: IRent[];
  selRent: IRent;
  badErr: boolean;
  private carErr: boolean;
  constructor(private rentSer: RentService, private userSer: UserService, private carSer: CarService) { }

  ngOnInit() {
    this.userSer.getUser().subscribe(user => {
      this.userID = user.ID;
    }).unsubscribe();
    this.rentSer.getRentHistory(this.userID).subscribe(rents => {
      // console.log(rents)
      this.rents = rents
    },
      (err: HttpErrorResponse) => {
        if (err.status !== 404) {
          this.badErr = true;
        }
      })
  }

  onSelect(rent: IRent) {
    //console.log(rent)
    this.carSer.getCarWithTypeByID(rent.CarID).subscribe(car => {
      this.car = car;
      this.carErr = false;
      this.selRent = rent;
      this.showDetail = true;
    }, () => {
      this.carErr = true;
      this.selRent = rent;
      this.showDetail = true;
    });
  }

}
