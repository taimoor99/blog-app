import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private usrService: LoginService,private authService: AuthService,
    private router: Router) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/home/blogs');
    }
  }

  login() {
    this.usrService.getUser(this.userForm.value).pipe(mergeMap(data => {
      if (data) {
        return this.authService.login(JSON.stringify(data[0]), data[0].id);
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

}
