import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Person } from './person';
import { Register } from './register';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class BitarApiService {

  url: string = 'https://api.bitar.is/account';

  constructor(private http: HttpClient) { }

  register(register: Register) {
    return this.http.post(this.url + '/register', register, { responseType: 'text' as 'json', observe: 'response' });
  }

  login(login: Login) {
    return this.http.post(this.url + '/login', login, { responseType: 'text' as 'json', observe: 'response' });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
