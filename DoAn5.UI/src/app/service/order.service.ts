import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { OrderDto } from '../model/order';


@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService<OrderDto> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/order`);
  }
}