
import { Observable, first } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Paging } from '../model/Paging';
import { BaseQuerieResponse } from '../model/Common/BaseQuerieResponse';
import { BaseCommandResponse } from '../model/Common/BaseCommandResponse';


export class BaseService<T> {

  constructor(protected _http: HttpClient, protected actionUrl: string) { }
  
  getAll(): Observable<T[]> {
    return this._http.get<T[]>(`${this.actionUrl}/getall`).pipe(first());
  }

  Search(keyword: string, page: number, pageSize: number): Observable<BaseQuerieResponse<T>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('keyword', keyword || '')  // Đảm bảo rằng keyword không bị undefined
    return this._http
      .get<BaseQuerieResponse<T>>(`${this.actionUrl}/Search`, { params })
      .pipe(first());
  }
  create<T>(data: T): Observable<BaseCommandResponse> {
    return this._http
      .post<BaseCommandResponse>(`${this.actionUrl}/create`, data)
      .pipe(first());
  }
}
