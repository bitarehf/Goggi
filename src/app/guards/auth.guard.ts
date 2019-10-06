import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BitarApiService } from '../services/bitar-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private bitar: BitarApiService, private router: Router, public jwtHelper: JwtHelperService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
      return false;
    }
    else if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
