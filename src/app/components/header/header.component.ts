import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BitarApiService } from 'src/app/services/bitar-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapse: boolean = true;

  constructor(private bitar: BitarApiService, private router: Router, private jwtHelper: JwtHelperService) { }

  logout() {
    this.bitar.logout();
    console.log('Logged out');
    // this.router.navigate(['/'])
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token') == null) {
      return false;
    }
    else if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return false;
    }

    return true;
  }

}
