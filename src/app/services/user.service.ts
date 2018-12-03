import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleHttpError } from '../functions/httpErrorHandler';
import { IEmployee } from '../models/employee';
import { ILogUser } from '../models/log-user';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api: string;
  private user = new BehaviorSubject<IEmployee>(null);

  constructor(private http: HttpClient) {
    this.api = environment.path + 'Users/';
    const user: string = localStorage.getItem("user");
    if (user) {
      this.user.next(JSON.parse(user)[0]);
    }
  }

  getUser() {
    return this.user.asObservable();
  }

  getUserByID(id: string | number): Observable<IUser> {
    return this.http.get<IUser>(this.api + id).pipe(
      catchError(handleHttpError('getUserByID'))
    );
  }

  getUsersAndEmps(id: string | number) { //By Branch ID
    return this.http.get<IEmployee[]>(this.api + 'With-Employees/' + id).pipe(
      map(res => {
        let users = [[], []];
        for (let i = 0; i < res.length; i++) {
          const u = res[i];
          if (u.BranchID !== null) {
            users[1].push(u) //employees
          }
          else {
            users[0].push(u) //regular users
          }
        }
        return users;
      })
      , catchError(handleHttpError('getUsersAndEmps'))
    );
  }

  getUserOrEmp(id: string | number, b_id: string | number): Observable<IEmployee> { //By Branch ID AND table ID
    return this.http.get<IEmployee>(this.api + 'With-Employees/' + id + '/' + b_id).pipe(
      catchError(handleHttpError('getUserOrEmp'))
    );
  }

  login(user: IEmployee | IUser, remember) {
    this.user.next(user[0]);
    if (remember) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("user");
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.api, user).pipe(
      catchError(handleHttpError('addUser'))
    );
  }

  updateUser(id: number | string, user: IUser) {
    return this.http.put(this.api + id, user).pipe(
      catchError(handleHttpError('updateUser'))
    );
  }

  delUser(id: string | number) {
    return this.http.delete(this.api + id).pipe(
      catchError(handleHttpError('delUser'))
    );
  }

  auth(user: ILogUser) {
    return this.http.post<any>(this.api + 'Auth', user).pipe(
      catchError(handleHttpError('authUser'))
    )
  }
}
