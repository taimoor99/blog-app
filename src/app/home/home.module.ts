import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeRoutingModule } from './home-routing.modules';
import { HomeComponent } from './home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NewBlogComponent } from './blogs/new-blog/new-blog.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';
import { MyBlogsComponent } from './blogs/my-blogs/my-blogs.component';
import { ReadBlogComponent } from './blogs/read-blog/read-blog.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, SignupComponent, LoginComponent, BlogsComponent, UpdateUserComponent,
     NewBlogComponent, EditBlogComponent, MyBlogsComponent, ReadBlogComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgbModule
  ]
})
export class HomeModule { }
