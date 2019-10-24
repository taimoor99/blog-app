import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  user: any;
  blogForm: FormGroup;
  blog: any;

  constructor(private fb: FormBuilder, private usrService: BlogsService, private authService: AuthService, public activeRoute: ActivatedRoute,
    private router: Router) {
    this.blogForm = this.fb.group({
      userId: ['', Validators.required],
      createdAt: ['', Validators.required],
      avatar: ['', Validators.required],
      name: ['', Validators.required],
      blogImage: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      likes: [0, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/home/blogs');
    }
    this.getBlogByID();
  }

  getBlogByID() {
    this.usrService.getBlog(this.activeRoute.snapshot.params['id']).subscribe(
      (res) => {
        this.blog = res;
        this.blogForm.patchValue({
          avatar: this.blog.avatar,
          userId: parseInt(this.blog.userId),
          createdAt: this.blog.createdAt,
          name: this.blog.name,
          tags: this.blog.tags,
          description: this.blog.description,
          blogImage: this.blog.blogImage,
        })
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onFileChanged(event) {
    let formData = new FormData();
    // let req = new XMLHttpRequest();
    let photo = event.target.files[0];  // file from input
    formData.append("image", photo);
    this.usrService.uploadImage(formData).subscribe(
      (res) => {
        this.blogForm.controls.blogImage.patchValue(res.data.link)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateBlog() {
    this.usrService.updateBlog(this.blog.id, this.blogForm.value).subscribe(
      (done) => {
        this.router.navigateByUrl('/home/my-blogs');
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

  delete() {
    this.usrService.deleteBlog({}, this.blog.id).subscribe(
      (done) => {
        this.authService.logout();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
