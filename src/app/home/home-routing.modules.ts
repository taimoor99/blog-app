import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NewBlogComponent } from './blogs/new-blog/new-blog.component';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';
import { MyBlogsComponent } from './blogs/my-blogs/my-blogs.component';
import { ReadBlogComponent } from './blogs/read-blog/read-blog.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/home/blogs',
        pathMatch: 'full'
      },
      {
        path: 'home/login',
        component: LoginComponent
      },
      {
        path: 'home/signup',
        component: SignupComponent
      },
      {
        path: 'home/blogs',
        component: BlogsComponent
      },
      {
        path: 'home/update-user',
        component: UpdateUserComponent
      },
      {
        path: 'home/new-blog',
        component: NewBlogComponent
      },
      {
        path: 'home/edit-blog/:id',
        component: EditBlogComponent
      },
      {
        path: 'home/my-blogs',
        component: MyBlogsComponent
      },
      {
        path: 'home/read-blog/:id',
        component: ReadBlogComponent
      }

    ])
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule { }