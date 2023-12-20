import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { BaseQuerieResponse } from '../model/Common/BaseQuerieResponse';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService<any> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/account`);
  }


  login(data:any):Observable<any>{
    return this._http
    .post<any>(`${this.actionUrl}/login`, {data})
    .pipe(first());
  }

  decodeToken() {
    const token = localStorage.getItem('Token');
    // Check if token is null or undefined
    if (!token) {
      throw new Error('Token is not present in localStorage');
    }
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }
    const payloadBase64 = tokenParts[1];
    const payload = JSON.parse(decodeURIComponent(escape(atob(payloadBase64))));
    return payload;
  }
  

}
