import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GEAR } from '../models/car-type';
import { ICarWithTypeAndDates } from '../models/carWithTypesAndDates';
import { CarService } from '../services/car.service';

@Component({
  selector: 'car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  gear = GEAR;
  car: ICarWithTypeAndDates;
  private favCars: ICarWithTypeAndDates[];
  private isFav: boolean;
  private isAddedToOrders: boolean;
  private alreadyAddedToOrders: boolean;
  err: string;

  constructor(private carSer: CarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.carSer.isSelSet()) {
      this.carSer.getSelCar().subscribe(car => {
        this.car = car;
        this.checkFav();
      }).unsubscribe();
    }
    else {
      const id = +this.route.snapshot.paramMap.get('id');
      if (isNaN(id)) {
        this.err = 'Invalid request'
      }
      else {
        this.carSer.getFullDetailsByID(id).subscribe(car => {
          this.car = car;
          this.checkFav();
        },
          (err: HttpErrorResponse) => {
            if (err.status !== 404)
              this.err = 'Something bad happend, please try again later';
          })
      }
    }

  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  checkFav() {
    if (this.car) {
      this.carSer.getFavCars().subscribe(cars => {
        const favs = this.favCars = cars;
        const id = this.car.ID;
        for (let i = 0; i < favs.length; i++) {
          if (favs[i].ID === id) {
            this.isFav = true;
            break;
          }
        }
      }).unsubscribe();
    }
  }

  addToFavCars() {
    if (!this.isAddedToOrders) {
      let ordCars;
      this.carSer.getOrderCars().subscribe(cars => {
        ordCars = cars;
      }).unsubscribe();
      for (let i = 0; i < ordCars.length; i++) {
        if (ordCars[i].ID === this.car.ID) {
          this.alreadyAddedToOrders = true;
          break;
        }
      }
      if (!this.alreadyAddedToOrders) {
        this.isFav = true;
        this.favCars.push(this.car);
        this.carSer.setFavCars(this.favCars);
      }
    }
    else {
      this.alreadyAddedToOrders = true;
    }
  }

  removeFavCar() {
    const id = this.car.ID;
    for (let i = 0; i < this.favCars.length; i++) {
      if (this.favCars[i].ID === id) {
        this.isFav = false;
        this.favCars.splice(i, 1);
        break;
      }
    }
    this.carSer.setFavCars(this.favCars);
  }

  addToOrders() {
    if (!this.isAddedToOrders) {
      let ordCars;
      this.carSer.getOrderCars().subscribe(cars => {
        ordCars = cars;
      }).unsubscribe();
      for (let i = 0; i < ordCars.length; i++) {
        if (ordCars[i].ID === this.car.ID) {
          this.alreadyAddedToOrders = true;
          break;
        }
      }
      if (!this.alreadyAddedToOrders) {
        ordCars.push(this.car);
        this.carSer.setOrderCars(ordCars);
        if (this.isFav)
          this.removeFavCar();
        this.isAddedToOrders = true;
      }
    }
    else {
      this.alreadyAddedToOrders = true;
    }
  }
}
