import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public authService: AuthService
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.afAuth.authState
    .pipe(take(1))
    .pipe(map(authState => !! authState))
    .pipe(tap(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    }));
  }

}
