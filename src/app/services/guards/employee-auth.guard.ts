import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthGuard implements CanActivate {

  constructor(private userSer: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.userSer.getUser().subscribe(user => {
      if (user && user.BranchID)
        return true;
      else {
        alert("You are unauthorized!");
        this.router.navigate(['/login'], { queryParams: { goto: state.url } });
      }
    }).unsubscribe();
    return true;
  }
}
