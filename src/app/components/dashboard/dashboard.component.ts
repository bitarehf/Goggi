import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AccountData } from "src/app/services/accountData";
import { BitarApiService } from 'src/app/services/bitar-api.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  email: string;
  username: string;

  constructor(private jwtHelper: JwtHelperService, public bitar: BitarApiService) { }

  ngOnInit() {
    this.bitar.getUserName().subscribe(res => {
      this.username = res;
    });

    this.bitar.getUserEmail().subscribe(res => {
      this.email = res;
    });
  }

}
