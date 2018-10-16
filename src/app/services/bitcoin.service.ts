import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Person } from './person';

@Injectable()
export class BitcoinService {

  url: string = 'http://localhost:5000/persons';

  constructor(private http: HttpClient) {
  }

  addPerson(person: Person): Observable<HttpResponse<Person>> {
    return this.http.post<Person>(this.url, person, { observe: 'response' });
  }
}
