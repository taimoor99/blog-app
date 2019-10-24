import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { BlogsService } from './blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogList: any;
  blogListCopy: any;
  show: false;
  selectedItem: any;
  blogSearch: any;
  showShortDesciption = false;
  likes: any;
  disable: any;
  userId: any;
  page = 1;
  count: any;

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

  logout() {
    this.authService.logout();
    this.disable = true;
  }

  alterDescriptionText(newValue) {
    this.selectedItem = newValue;
    this.showShortDesciption = !this.showShortDesciption;
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

  getBlogsList() {
    this.blogService.getBlogsList().subscribe(
      (res) => {
        this.count = res.length;
        this.blogListCopy = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchBlogByTag() {
    let term = this.blogSearch;
    this.blogList = this.blogListCopy.filter(function (tag) {
      return tag.tags.indexOf(term) >= 0;
    });
  }

  viewDetailPage(blogId: number) {
    this.router.navigate(['home/read-blog', blogId]);
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
