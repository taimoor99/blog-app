import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/services/basehttp.service';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService extends BaseHttpService {

  constructor(public http: HttpClient) {
    super(http);
  }

  updateUser(credential: any, id): Observable<any> {
    return this.put(environment.Api + 'user/'+id, credential);
  }
 
  deleteUser(credential: any, id): Observable<any> {
    return this.delete(environment.Api + 'user/'+id, credential);
  }

  uploadImage(credential: any): Observable<any> {
    return this.postImage('https://api.imgur.com/3/image', credential);
  }
}
