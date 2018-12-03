import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { handleHttpError } from 'src/app/functions/httpErrorHandler';
import { catchError } from '../../../node_modules/rxjs/operators';
import { environment } from '../../environments/environment';
import { ICarType } from '../models/car-type';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {

  private api: string;
  constructor(private http: HttpClient) {
    this.api = environment.path + 'CarTypes/';
  }

  getTypes(): Observable<ICarType[]> {
    return this.http.get<any>(this.api).pipe(
      catchError(handleHttpError('getTypes')));
  }

  getType(id: number | string): Observable<ICarType> {
    return this.http.get<any>(this.api + id).pipe(
      catchError(handleHttpError('getType')));
  }

  delCT(id: string | number) {
    return this.http.delete(this.api + id).pipe(
      catchError(handleHttpError('delCT')));
  }

  updateCT(id: string | number, ct: ICarType) {
    return this.http.put(this.api + id, ct).pipe(
      catchError(handleHttpError('updateCT')));
  }

  addCT(ct: ICarType) {
    return this.http.post(this.api, ct).pipe(
      catchError(handleHttpError('addCT')));
  }

}
