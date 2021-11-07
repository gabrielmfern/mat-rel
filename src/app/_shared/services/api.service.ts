import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  get<T>(uri: string, authorization?: string): Promise<T> {
    return this.httpClient
      .get<T>(environment.api_url + uri, {
        headers: authorization
          ? new HttpHeaders({
            authorization: authorization
          })
          : new HttpHeaders()
      })
      .pipe(first())
      .toPromise();
  }

  post<T>(uri: string, body: any, authorization?: string): Promise<T> {
    return this.httpClient
      .post<T>(environment.api_url + uri, body, {
        headers: authorization
          ? new HttpHeaders({
            authorization: authorization
          })
          : new HttpHeaders()
      })
      .pipe(first())
      .toPromise();
  }

  put<T>(uri: string, body: any, authorization?: string): Promise<T> {
    return this.httpClient
      .put<T>(environment.api_url + uri, body, {
        headers: authorization
          ? new HttpHeaders({
            authorization: authorization
          })
          : new HttpHeaders()
      })
      .pipe(first())
      .toPromise();
  }

  delete<T>(uri: string, authorization?: string): Promise<T> {
    return this.httpClient
      .delete<T>(environment.api_url + uri, {
        headers: authorization
          ? new HttpHeaders({
            authorization: authorization
          })
          : new HttpHeaders()
      })
      .pipe(first())
      .toPromise();
  }
}
