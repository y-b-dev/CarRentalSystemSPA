import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private userSer: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.userSer.getUser().subscribe(user => {
      if (user)
        return true;
      else {
        alert("You must login first!");
        this.router.navigate(['/login'], { queryParams: { goto: state.url } });
      }
    }).unsubscribe();
    return true;
  }
}
