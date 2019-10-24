import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/services/basehttp.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService extends BaseHttpService {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBlogsList(): Observable<any> {
    return this.get(environment.Api + 'blogs');
  }
 
  getBlogsListByUser(userId): Observable<any> {
    return this.get(environment.Api + 'blogs?userId='+userId);
  }
 
  getBlogsListByPage(limit, page): Observable<any> {
    return this.get(environment.Api + 'blogs?page='+page+'&limit='+limit+'&sortBy=createdAt');
  }
 
  addLikeToBlog(credential: any): Observable<any> {
    return this.put(environment.Api + 'blogs/'+credential.id, credential);
  }

  addLike(credential): Observable<any> {
    return this.post(environment.Api + 'likes', credential);
  }
  
  deleteLikeToBlog(credential: any): Observable<any> {
    return this.put(environment.Api + 'blogs/'+credential.id, credential);
  }

  deleteLike(credential): Observable<any> {
    return this.delete(environment.Api + 'likes/'+ credential.id, {});
  }

  getLikes(userId): Observable<any> {
    return this.get(environment.Api + 'likes?userId='+userId);
  }

  getBlog(id): Observable<any> {
    return this.get(environment.Api + 'blogs/'+id);
  }

  addComment(payLoad): Observable<any> {
    return this.post(environment.Api + 'comments', payLoad);
  }

  getComments(id): Observable<any> {
    return this.get(environment.Api + 'comments?blogId='+id);
  }

  deleteComments(id): Observable<any> {
    return this.delete(environment.Api + 'comments/'+id, {});
  }

  createBlog(credential: any): Observable<any> {
    return this.post(environment.Api + 'blogs', credential);
  }

  uploadImage(credential: any): Observable<any> {
    return this.postImage('https://api.imgur.com/3/image', credential);
  }
  updateBlog(id: any, credential): Observable<any> {
    return this.put(environment.Api + 'blogs/'+id, credential);
  }

  deleteBlog(credential: any, id): Observable<any> {
    return this.delete(environment.Api + 'blogs/'+id, credential);
  }
}  