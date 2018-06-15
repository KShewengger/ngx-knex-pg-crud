import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Account } from "../../../../../shared/interfaces/-index";


@Injectable()
export class UserService {

  url: string;
  
  constructor(private http: HttpClient,
              @Inject("API_URL") private apiUrl: string) {
    this.url = `${apiUrl}/user`;
  }
  
  fetchAllUsers():Observable<any> {
    return this.http
    .get(`${this.url}/`)
    .map(response => response)
    .catch(err => Observable.throw(err));
  }
  
  fetchUser(id: string): Observable<Account> {
    return this.http
    .get(`${this.url}/${id}`)
    .map(response => response)
    .catch(err => Observable.throw(err));
  }

}
