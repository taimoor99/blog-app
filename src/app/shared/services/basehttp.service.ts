import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  
  constructor(public http: HttpClient) { 
  }

  public post(url: any, credential: any): Observable<Response> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this.http.post(url, credential)
      .pipe(map((result: any) => {
        return result;
      }));
  }

  public get(url: any): Observable<Response> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this.http.get(url)
      .pipe(map((result: any) => {
        return result;
      }));
  }

  public delete(url: any, credential: any): Observable<Response> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this.http.delete(url, credential)
      .pipe(map((result: any) => {
        return result;
      }));
  }

  public put(url: any, credential?: any): Observable<Response> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('Token'));
    return this.http.put(url, credential)
      .pipe(map((result: any) => {
        return result;
      }));
  }

  public postImage(url: any, credential: any): Observable<Response> {
    const headers = new HttpHeaders().set('Authorization', 'Client-ID 22f049611b164de');
    return this.http.post(url, credential, { headers })
      .pipe(map((result: any) => {
        return result;
      }));
  }
}