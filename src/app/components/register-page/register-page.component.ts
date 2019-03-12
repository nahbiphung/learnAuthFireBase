import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmitAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then( res => {
      this.toastr.success('Create user thanh cong', 'Success');
      this.router.navigate(['/private']);
      // console.log(res);
    }).catch(err => {
      this.toastr.warning(err.message, 'Warning');
      console.log(err);
    });
  }
}
