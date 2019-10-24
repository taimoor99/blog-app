import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {
  blogList: any;
  blogListCopy: any;
  show: false;
  selectedItem: any;
  blogSearch: any;
  showShortDesciption = false;
  page = 1;
  count: any;
  userId: any;
  disable: boolean = false;
  likes: any = [];

  constructor(private authService: AuthService, private blogService: BlogsService,
    private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('Token')
    if (this.userId == null || this.userId == '') {
      this.disable = true;
    }
    this.getLikes(this.userId);
    this.getBlogsList();
  }

  like(blog) {
    if (this.checkAlreadyLike(blog)) {
      this.deleteLikeToBlog(blog);
    } else {
      this.addLikeToBlog(blog);
    }
  }

  addLikeToBlog(blog) {
    this.disable = true;
    blog.likes = blog.likes + 1;
    this.blogService.addLikeToBlog(blog).subscribe(
      (res) => {
        this.addLike(localStorage.getItem('Token'), blog.id);
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
        console.log('like deleted');
        this.getLikes(userId)
        this.disable = false;
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
        console.log('like added');
        this.getLikes(userId);
        this.disable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBlogsList() {
    this.blogService.getBlogsListByUser(localStorage.getItem('Token')).subscribe(
      (res) => {
        this.count = res.length;
        this.blogListCopy = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToEdit(id) {
    this.router.navigateByUrl('/home/edit-blog/'+id);
  }

  logout() {
    this.authService.logout();
    this.disable = true;
    this.router.navigateByUrl('/home/blogs');
  }

  alterDescriptionText(newValue) {
    this.selectedItem = newValue;
    this.showShortDesciption = !this.showShortDesciption;
  }

  searchBlogByTag() {
    let term = this.blogSearch;
    this.blogList = this.blogListCopy.filter(function (tag) {
      return tag.tags.indexOf(term) >= 0;
    });
  }

  viewEditPage(blogId: number) {
    this.router.navigate(['home/edit-blog', blogId]);
  }

  getLikes(userId) {
    this.blogService.getLikes(userId).subscribe(
      (res) => {
        this.likes = res;
        this.getBlogsListByPage();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBlogsListByPage() {
    this.blogService.getBlogsListByPage(10, this.page).subscribe(
      (res) => {
        this.blogList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkAlreadyLike(item): boolean {
    const filter = this.likes.filter(function (result) {
      return result.userId === localStorage.getItem('Token') && result.blogId === item.id;
    });
    if (filter.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
