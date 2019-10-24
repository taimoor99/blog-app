import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;
  avatar: null;
  constructor(private fb: FormBuilder,private usrService: SignupService,private authService: AuthService,
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
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/home/blogs');
    }
  }
  onFileChanged(event) {
    let formData = new FormData();
    // let req = new XMLHttpRequest();
    let photo =  event.target.files[0];  // file from input
    formData.append("image", photo);
    this.usrService.uploadImage(formData).subscribe(
      (res) => {
        this.userForm.controls.avatar.patchValue (res.data.link)
        this.avatar = res.data.link;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  signUp() {
    this.userForm.controls.createdAt.patchValue (new Date())
    console.log(this.userForm.value);
    
     this.usrService.createUser(this.userForm.value).subscribe(
        (done) => {
        //  this.showMessage = true;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
