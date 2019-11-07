import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountData } from './accountData';
import { Login } from './login';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class BitarApiService {

  apiUrl: string = 'https://api.bitar.is/';

  constructor(private http: HttpClient) { }

  register(register: Register) {
    return this.http.post(this.apiUrl + 'account/register', register, { responseType: 'text' as 'json', observe: 'response' });
  }

  login(login: Login) {
    return this.http.post(this.apiUrl + 'account/login', login, { responseType: 'text' as 'json', observe: 'response' });
  }

  logout() {
    // TODO: Invalidate token
    localStorage.removeItem('token');
  }

  order(amount: number) {
    return this.http.post(this.apiUrl + 'market/order', amount, { responseType: 'text' as 'json', observe: 'response' });
  }

  getAccountData(): Observable<AccountData> {
    return this.http.get<AccountData>(this.apiUrl + 'accountdata/getaccountdata');
  }

  getAddressBalance(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'accountdata/getaddressbalance');
  }
}
