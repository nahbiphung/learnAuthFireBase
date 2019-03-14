import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogin: boolean;
  public nameUser: string;
  public emailUser: string;
  public photoLink: string;
  public idUser: string;

  constructor(
    public authService: AuthService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLogin = true;
        this.idUser = auth.uid;
        this.nameUser = auth.displayName;
        this.emailUser = auth.email;
        this.photoLink = auth.photoURL;
      } else {
        this.isLogin = false;
      }
    });
  }

  onClickLogout() {
    this.authService.logout();
    this.toast.success('Logout thanh cong', 'Logout');
  }
}
