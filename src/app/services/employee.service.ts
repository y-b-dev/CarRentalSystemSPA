import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { catchError } from '../../../node_modules/rxjs/operators';
import { environment } from '../../environments/environment';
import { handleHttpError } from '../functions/httpErrorHandler';
import { IEmployee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private api;
  constructor(private http: HttpClient) {
    this.api = environment.path + 'Employees/';
  }

  addEmployee(emp: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.api, emp).pipe(
      catchError(handleHttpError('addEmployee'))
    );
  }

  delEmployee(id: string | number) {
    return this.http.delete(this.api + id).pipe(
      catchError(handleHttpError('delEmployee'))
    );
  }
}
