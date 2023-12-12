import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { CategoriesDto } from '../model';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<CategoriesDto> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/sanpham`);
  }
}
