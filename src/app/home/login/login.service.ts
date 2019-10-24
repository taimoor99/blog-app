import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/services/basehttp.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseHttpService {

    constructor(public http: HttpClient) {
      super(http);
    }
  
    getUser(credential: any): Observable<any> {
      return this.get(environment.Api + 'user?username='+credential.username+'&password='+credential.password);
    }
  }  