import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountData } from "src/app/services/accountData";
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  id: number;
  email: string;

  constructor(private jwtHelper: JwtHelperService, public bitar: BitarApiService) { }

  ngOnInit() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.id = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    this.bitar.getUserEmail().subscribe(res => {
      this.email = res;
    });
  }

}
