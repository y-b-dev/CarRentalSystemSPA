import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleHttpError } from '../functions/httpErrorHandler';
import { IRent } from '../models/rent';
import { IRentForManager } from '../models/rents-for-manager';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private api;
  private rent = new BehaviorSubject<IRent>(null);

  constructor(private http: HttpClient) {
    this.api = environment.path + 'RentDetails/';
  }

  addOrders(orders: IRent[]): Observable<IRent[]> {
    return this.http.post<any>(this.api, orders).pipe(
      catchError(handleHttpError('addOrders')));
  }

  getRentsForManager(): Observable<IRentForManager[]> {
    return this.http.get<any>(this.api + "For-Manager").pipe(
      catchError(handleHttpError('getRentsForManager')));
  }

  getRentHistory(id: number | string): Observable<IRent[]> {
    return this.http.get<IRent[]>(this.api + "By-UserID/" + id).pipe(
      catchError(handleHttpError('getRentHistory')));
  }

  getRents(): Observable<IRent[]> {
    return this.http.get<IRent[]>(this.api).pipe(
      catchError(handleHttpError('getRents')));
  }

  getRentByID(id: number | string): Observable<IRent> {
    return this.http.get<IRent>(this.api + id).pipe(
      catchError(handleHttpError('getRentByID')));
  }

  updateRent(id: number | string, rent: IRent) {
    return this.http.put(this.api + id, rent).pipe(
      catchError(handleHttpError('updateRent')));;
  }

  delRent(id: number | string) {
    return this.http.delete(this.api + id).pipe(
      catchError(handleHttpError('delRent')));;
  }

  getRent() {
    return this.rent.asObservable();
  }

  setRent(rent: IRent) {
    this.rent.next(rent);
  }
}
