import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitcoinWithdrawal } from '../components/dashboard/withdrawal/bitcoinWithdrawal';
import { AccountData } from './accountData';
import { Login } from './login';
import { Register } from './register';



@Injectable({
  providedIn: 'root'
})
export class BitarApiService {

  apiUrl: string = 'https://api.bitar.is/';


  public account: AccountData;
  public email: string;

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
    let result = this.http.get<AccountData>(this.apiUrl + 'accountdata/getaccountdata');
    result.subscribe(r => (this.account = r));
    return result;
  }

  getAddressBalance(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'accountdata/getaddressbalance');
  }

  getUserEmail(): Observable<any> {
    return this.http.get<string>(this.apiUrl + 'account/getuseremail', { responseType: 'text' as 'json'});
  }

  withdrawBitcoin(bitcoinWithdrawal: BitcoinWithdrawal) {
    return this.http.post<string>(this.apiUrl + 'bitcoin/withdraw', bitcoinWithdrawal, { responseType: 'text' as 'json', observe: 'response' });
  }
  withdrawISK(amount: number) {
    return this.http.post<string>(this.apiUrl + 'accountdata/withdraw', amount, { responseType: 'text' as 'json', observe: 'response' });
  }

  setWithdrawalAddress(bitcoinAddress: string) {
    return this.http.post<string>(this.apiUrl + 'accountdata/updatewithdrawaladdress', JSON.stringify(bitcoinAddress), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json', observe: 'response' })
  }

  setBankAccountNumber(bankAccountNumber: string) {
    return this.http.post<string>(this.apiUrl + 'accountdata/updatebankaccountnumber', JSON.stringify(bankAccountNumber), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json', observe: 'response' })
  }
}
