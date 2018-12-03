import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICarWithTypeAndDates } from 'src/app/models/carWithTypesAndDates';
import { GEAR } from '../models/car-type';
import { CarService } from '../services/car.service';
import { RentService } from '../services/rent.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {

  private cars: ICarWithTypeAndDates[];
  private favCars: ICarWithTypeAndDates[];
  private ordCars: ICarWithTypeAndDates[];
  private fav_cars_sub: Subscription;
  private order_cars_sub: Subscription;
  private preManufactor: ICarWithTypeAndDates[];
  private preYear: ICarWithTypeAndDates[];
  private preModel: ICarWithTypeAndDates[];
  private preGear: ICarWithTypeAndDates[];
  private preDates: ICarWithTypeAndDates[];
  bsValue = new Date();
  inputVal: string = '';
  years: number[];
  manufactors: string[];
  models: string[];
  gears = GEAR;
  filteredCars: ICarWithTypeAndDates[];

  constructor(private carSer: CarService, private router: Router, private route: ActivatedRoute,
    private searchSer: SearchService, private rentSer: RentService) {
    window.onbeforeunload = () => {
      localStorage.setItem("favs", JSON.stringify(this.favCars));
    }
  }

  ngOnInit() {
    this.carSer.getFullDetails().subscribe(cars => {
      //console.log(cars)
      this.filteredCars = this.cars = cars;
      this.route.queryParamMap.subscribe(query => {
        this.inputVal = query.get('search');
        if (this.inputVal) {
          const lowerTerm = this.inputVal.toLowerCase();
          this.filteredCars = this.cars.filter(car => {
            return ((car['Model'].toLowerCase()).includes(lowerTerm) || (car['Manufactor'].toLowerCase()).includes(lowerTerm)
              || (car['Year'].toString()).includes(lowerTerm) || (GEAR[car['Gear']].toLowerCase()).includes(lowerTerm))
          })
        }
      });
      setTimeout(() => {
        this.setYears();
        this.setManufactors();
        this.setModels();
      }, 0);
    });

    this.searchSer.$search.subscribe(term => {
      this.router.navigate(['cars'], { queryParams: { search: term } });
    });

    this.fav_cars_sub = this.carSer.getFavCars().subscribe(cars => {
      this.favCars = cars;
    })
    this.order_cars_sub = this.carSer.getOrderCars().subscribe(cars => {
      this.ordCars = cars;
    });
    //console.log(this.favCars)
  }

  onSearch(term: string) {
    this.searchSer.search(term);
  }

  goToCar(car: ICarWithTypeAndDates) {
    this.carSer.setSelCar(car);
    this.router.navigate([car.ID], { relativeTo: this.route });
  }

  removeFavCar(id: number) {
    for (let i = 0; i < this.favCars.length; i++) {
      if (this.favCars[i].ID === id) {
        this.favCars.splice(i, 1);
        break;
      }
    }
  }

  addToOrders(car: ICarWithTypeAndDates) {
    this.ordCars.push(car);
    this.removeFavCar(car.ID);
  }

  setYears() {
    let years = [];
    for (let i = 0; i < this.filteredCars.length; i++) {
      const year = this.filteredCars[i].Year;
      if (years.indexOf(year) === -1) {
        years.push(year)
      }
    }
    this.years = years.sort((a, b) => a - b);
  }

  setGear() {
    let gears = [];
    for (let i = 0; i < this.filteredCars.length; i++) {
      const g = GEAR[this.filteredCars[i].Gear];
      if (gears.indexOf(g) === -1) {
        gears.push(g);
      }
    }
    this.gears = gears.sort((a, b) => a - b);
  }

  setManufactors() {
    let m = [];
    for (let i = 0; i < this.filteredCars.length; i++) {
      const man = this.filteredCars[i].Manufactor;
      if (m.indexOf(man) === -1) {
        m.push(man)
      }
    }
    this.manufactors = m.sort();
  }

  setModels() {
    let m = [];
    for (let i = 0; i < this.filteredCars.length; i++) {
      const model = this.filteredCars[i].Model;
      if (m.indexOf(model) === -1) {
        m.push(model)
      }
    }
    this.models = m.sort();
  }

  filterGear(val) {
    if (!this.preGear) {
      this.preGear = this.filteredCars;
    }
    if (val) {
      this.filteredCars = this.preGear.filter(car => GEAR[car.Gear] === val);
    }
    else {
      this.filteredCars = this.preGear;
    }
    this.setModels();
    this.setYears();
    this.setManufactors();
  }


  filterYear(val) {
    if (!this.preYear) {
      this.preYear = this.filteredCars;
    }
    this.filteredCars = this.preYear;
    if (!isNaN(val)) {
      this.filteredCars = this.preYear.filter(car => car.Year === +val)
    }
    else {
      this.filteredCars = this.preYear;
    }
    this.setModels();
    this.setGear();
    this.setManufactors();
  }

  filterManufactor(val) {
    if (!this.preManufactor) {
      this.preManufactor = this.filteredCars;
    }
    if (val) {
      this.filteredCars = this.preManufactor.filter(car => car.Manufactor === val)
    }
    else {
      this.filteredCars = this.preManufactor;
    }
    this.setModels();
    this.setGear();
    this.setYears();
  }

  filterModel(val) {
    if (!this.preModel) {
      this.preModel = this.filteredCars;
    }
    if (val) {
      this.filteredCars = this.preModel.filter(car => car.Model === val)
    }
    else {
      this.filteredCars = this.preModel;
    }
    this.setManufactors();
    this.setGear();
    this.setYears();
  }

  filterDates(val: Date[]) {
    if (!this.preDates) {
      this.preDates = this.filteredCars;
    }
    else {
      this.filteredCars = this.preDates;
    }
    this.filteredCars = this.preDates.filter(car => {
      const datesArr = car.Dates;
      const len = datesArr.length;
      if (!len) {
        return true;
      }
      else {
        for (let i = 0; i < len; i++) {
          const dates = datesArr[i];
          if (!(val[0].setHours(0, 0, 0, 0) > new Date(dates['EndDate']).getTime() ||
            val[1].setHours(0, 0, 0, 0) < new Date(dates['StartDate']).getTime())) {
            return false;
          }
        }
        return true;
      }
    })
    this.setManufactors();
    this.setGear();
    this.setYears();
    this.setModels();
  }

  ngOnDestroy() {
    this.carSer.setFavCars(this.favCars);
    this.carSer.setOrderCars(this.ordCars);
    this.fav_cars_sub.unsubscribe();
    this.order_cars_sub.unsubscribe();
  }

}
