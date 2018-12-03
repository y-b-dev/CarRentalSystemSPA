import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICarWithTypeAndDates } from '../models/carWithTypesAndDates';
import { IEmployee } from '../models/employee';
import { IRent } from '../models/rent';
import { IUser } from '../models/user';
import { CarService } from '../services/car.service';
import { RentService } from '../services/rent.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  sum: number[] = [];
  dates: Date[][] = [];
  cars: ICarWithTypeAndDates[];
  private car_sub: Subscription;
  private user: IUser | IEmployee;
  private user_sub: Subscription;
  private success: boolean;
  private err: boolean;

  constructor(private carSer: CarService, private userSer: UserService, private rentSer: RentService) { }

  ngOnInit() {
    this.car_sub = this.carSer.getOrderCars().subscribe(cars => this.cars = cars);
    this.user_sub = this.userSer.getUser().subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.car_sub.unsubscribe();
    this.user_sub.unsubscribe();
  }

  setSum(total, i) {
    this.sum[i] = total;
  }

  remove(id: number) {
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].ID === id) {
        this.cars.splice(i, 1);
        break;
      }
    }
    this.carSer.setOrderCars(this.cars);
  }

  getSum() {
    return this.sum.reduce((a, b) => a + b);
  }

  setDates(dates: Date[], i) {
    this.dates[i] = dates;
  }

  submitOrder() {
    let dates: Date[], car: ICarWithTypeAndDates, orders: IRent[] = [];
    for (let i = 0; i < this.cars.length; i++) {
      dates = this.dates[i];
      if (dates[0].getTime() !== dates[1].getTime()) {
        car = this.cars[i];
        orders.push({ StartDate: dates[0], EndDate: dates[1], ActualEndDate: null, BranchID: car.BranchID, UserID: this.user.ID, CarID: car.ID });
      }
    }
    //console.log(orders)
    if (orders.length) {
      this.rentSer.addOrders(orders).subscribe(() => {
        this.success = true;
        this.carSer.setOrderCars([]);
      },
        () => this.err = true);
    }
  }
}
