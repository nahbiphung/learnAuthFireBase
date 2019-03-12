import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.authService.loginEmail(this.email, this.password)
      .then(res => {
        this.toast.success('Dang nhap thanh cong', 'Success');
        this.router.navigate(['/private']);
      }).catch(err => {
        console.log(err);
        this.toast.error(err.message, 'Error');
        this.router.navigate(['/login']);
      });
  }

  onClickGoogleLogin() {
    this.authService.loginGoogle()
    .then(res => {
      this.toast.success('Dang nhap thanh cong', 'Success');
      this.router.navigate(['/private']);
    }).catch(err => {
      console.log(err);
      this.toast.error(err.message, 'Error');
      this.router.navigate(['/login']);
    });
  }

  onClickFacebookLogin() {
    this.authService.loginFacebook()
    .then( res => {
      this.toast.success('Dang nhap thanh cong', 'Success');
      this.router.navigate(['/private']);
    }).catch(err => {
      console.log(err);
      this.toast.error(err.message, 'Error');
      this.router.navigate(['/login']);
    });
  }
}
