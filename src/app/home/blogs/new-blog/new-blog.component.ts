import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {
  user: any;
  blogForm: FormGroup;
  constructor(private fb: FormBuilder, private usrService: BlogsService, private authService: AuthService,
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
    this.user = JSON.parse(localStorage.getItem('User'));
    this.blogForm.patchValue({
      avatar: this.user.avatar,
      userId: this.user.id,
      createdAt: new Date(),
    });

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
  createBlog() {
    this.blogForm.controls.createdAt.patchValue(new Date())
    this.usrService.createBlog(this.blogForm.value).subscribe(
      (done) => {
        this.router.navigateByUrl('/home/blogs');
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
