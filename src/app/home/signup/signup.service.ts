import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from 'src/app/shared/services/basehttp.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService extends BaseHttpService {

  constructor(public http: HttpClient) {
    super(http);
  }

  createUser(credential: any): Observable<any> {
    return this.post(environment.Api + 'user', credential);
  }

  uploadImage(credential: any): Observable<any> {
    return this.postImage('https://api.imgur.com/3/image', credential);
  }
}
