import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleHttpError } from '../functions/httpErrorHandler';
import { ICar } from '../models/car';
import { ICarBackRes } from '../models/car-back-res';
import { ICarWithType } from '../models/carWithType';
import { ICarWithTypeAndDates } from '../models/carWithTypesAndDates';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private api: string;
  private favCars: BehaviorSubject<ICarWithTypeAndDates[]> = new BehaviorSubject<ICarWithTypeAndDates[]>([]);
  private orderCars: BehaviorSubject<ICarWithTypeAndDates[]> = new BehaviorSubject<ICarWithTypeAndDates[]>([]);
  private selCar: BehaviorSubject<ICarWithTypeAndDates | ICar> = new BehaviorSubject<ICarWithTypeAndDates | ICar>(null);
  private isSet: boolean;

  constructor(private http: HttpClient) {
    this.api = environment.path + 'Cars/';
    const favs = localStorage.getItem("favs");
    if (favs) {
      this.setFavCars(JSON.parse(favs));
    }
  }

  getCarsByBranchID(id: number | string): Observable<ICar[]> {
    return this.http.get<ICar[]>(this.api + 'By-BranchID/' + id).pipe(
      catchError(handleHttpError('getCarsByBranchID'))
    );
  }

  getCarByID(id: number | string): Observable<ICar> {
    return this.http.get<ICar>(this.api + id).pipe(
      catchError(handleHttpError('getCarByID'))
    );
  }

  getCarWithTypeByID(id: number | string): Observable<ICarWithType> {
    return this.http.get<ICarWithType>(this.api + 'With-Type/' + id).pipe(
      catchError(handleHttpError('getCars'))
    );
  }

  getFullDetails(): Observable<ICarWithTypeAndDates[]> {
    return this.http.get<ICarWithTypeAndDates[]>(this.api + 'FullDetails').pipe(
      catchError(handleHttpError('getFullDetails'))
    );
  }

  getFullDetailsByID(id: number | string): Observable<ICarWithTypeAndDates> {
    return this.http.get<ICarWithTypeAndDates>(this.api + 'FullDetails/' + id).pipe(
      catchError(handleHttpError('getFullDetailsByID'))
    );
  }

  carBack(carID: number | string, branchID: number | string): Observable<ICarBackRes> {
    return this.http.get<ICarBackRes>(this.api + 'Return-Car/' + carID + '/' + branchID).pipe(
      catchError(handleHttpError('carBack'))
    );
  }

  addCar(car: ICar) {
    return this.http.post(this.api, car).pipe(
      catchError(handleHttpError('addCar'))
    );
  }

  updateCar(id: number | string, car: ICar) {
    return this.http.put(this.api + id, car).pipe(
      catchError(handleHttpError('updateCar'))
    );
  }

  delCar(id: number | string): Observable<ICar> {
    return this.http.delete<ICar>(this.api + id).pipe(
      catchError(handleHttpError('delCar'))
    );
  }

  setSelCar(car) {
    this.selCar.next(car);
    this.isSet = true;
  }

  getSelCar(): Observable<any> {
    return this.selCar.asObservable();
  }

  isSelSet() {
    return this.isSet;
  }

  setFavCars(cars) {
    this.favCars.next(cars);
  }

  getFavCars(): Observable<ICarWithTypeAndDates[]> {
    return this.favCars.asObservable();
  }

  setOrderCars(cars) {
    this.orderCars.next(cars);
  }

  getOrderCars(): Observable<ICarWithTypeAndDates[]> {
    return this.orderCars.asObservable();
  }

}
