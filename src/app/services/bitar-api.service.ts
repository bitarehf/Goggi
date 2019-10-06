import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Person } from './person';
import { Register } from './register';
import { Login } from './login';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BitarApiService {

  url: string = 'https://api.bitar.is/';

  constructor(private http: HttpClient) { }

  register(register: Register) {
    return this.http.post(this.url + 'account/register', register, { responseType: 'text' as 'json', observe: 'response' });
  }

  login(login: Login) {
    return this.http.post(this.url + 'account/login', login, { responseType: 'text' as 'json', observe: 'response' });
  }

  logout() {
    // TODO: Invalidate token
    localStorage.removeItem('token');
  }

  // getAccountData() {
  //   return this.http.get<AccountData>(this.url + 'accountdata/accountdata');
  // }
}
