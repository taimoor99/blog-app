import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.css']
})
export class ReadBlogComponent implements OnInit {
  blog: any;
  disable: boolean = false;
  likes: any;
  comment: any;
  blogComments: any = [];
  userId: any;

  constructor(public activeRoute: ActivatedRoute,private router: Router, private blogService: BlogsService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('Token');
    if (this.userId == null || this.userId == '') {
      this.disable = true;
    }
    this.getLikes(this.userId);
  }

  like(blog) {
    if (this.checkAlreadyLike(blog)) {
      this.deleteLikeToBlog(blog);
    } else {
      this.addLikeToBlog(blog);
    }
  }

  getBlogByID() {
    this.blogService.getBlog(this.activeRoute.snapshot.params['id']).subscribe(
      (res) => {
        this.blog = res;
        this.getComments();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getLikes(userId) {
    this.blogService.getLikes(userId).subscribe(
      (res) => {
        this.likes = res;
        this.getBlogByID();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkAlreadyLike(item): boolean {
    const filter = this.likes.filter(function (result) {
      return result.userId === this.userId && result.blogId === item.id;
    });
    if (filter.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  addComments(blog, comment) {
    const payLoad = {
      userId: localStorage.getItem('Token'),
      blogId: parseInt(blog.id),
      comment: comment,
      avatar: JSON.parse(localStorage.getItem('User')).avatar
    };
    this.blogComments.push(payLoad);
    this.blogService.addComment(payLoad).subscribe(
      (res) => {
        console.log('like added');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getComments() {
    this.blogService.getComments(this.blog.id).subscribe(
      (res) => {
        this.blogComments = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeComment(commentId, index) {
    this.blogService.deleteComments(commentId).subscribe(
      (res) => {
        this.blogComments.splice(index, 1)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addLikeToBlog(blog) {
    if (this.userId == null) {
      return;
    }
    this.disable = true;
    blog.likes = blog.likes + 1;
    this.blogService.addLikeToBlog(blog).subscribe(
      (res) => {
        this.addLike(this.userId, blog.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addLike(userId, blogId) {
    const payLoad = {
      userId: userId,
      blogId: blogId
    }
    this.blogService.addLike(payLoad).subscribe(
      (res) => {
        this.disable = false;
        this.getLikes(userId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteLikeToBlog(blog) {
    this.disable = true;
    blog.likes = blog.likes - 1;
    this.blogService.deleteLikeToBlog(blog).subscribe(
      (res) => {
        this.deleteLike(localStorage.getItem('Token'), blog.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteLike(userId, blogId) {
    const filter = this.likes.filter(function (result) {
      return result.userId === userId && result.blogId === blogId;
    });
    this.blogService.deleteLike(filter[0]).subscribe(
      (res) => {
        this.router.navigateByUrl('/home/blogs');
        this.getLikes(userId)
        this.disable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home/blogs');
  }
}
