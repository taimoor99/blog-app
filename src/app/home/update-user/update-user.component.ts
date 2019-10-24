import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../signup/signup.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { UpdateUserService } from './update-user.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any;
  userForm: FormGroup;
  constructor(private fb: FormBuilder,private usrService: UpdateUserService,private authService: AuthService,
    private router: Router) { 
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      createdAt: [''],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User'));
    this.userForm.setValue({
      username: this.user.username,
      name: this.user.name,
      avatar: this.user.avatar,
      createdAt: this.user.createdAt,
      password: this.user.password
    }) 
  }

  onFileChanged(event) {
    let formData = new FormData();
    // let req = new XMLHttpRequest();
    let photo =  event.target.files[0];  // file from input
    formData.append("image", photo);
    this.usrService.uploadImage(formData).subscribe(
      (res) => {
        this.userForm.controls.avatar.patchValue (res.data.link)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update() {
    const id = localStorage.getItem('Token');
     this.usrService.updateUser(this.userForm.value, id).pipe(mergeMap(data => {
      if (data) {
        return this.authService.login(JSON.stringify(data), data.id);
      }
    }))
      .subscribe(
        (done) => {
          if (done && this.authService.isLoggedIn) {
            this.router.navigateByUrl('/home/blogs');
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  
  delete() {
    const id = localStorage.getItem('Token');
    this.userForm.controls.createdAt.patchValue (new Date())
     this.usrService.deleteUser({}, id).subscribe(
        (done) => {
        this.authService.logout();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}