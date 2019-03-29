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
    return this.authService.user.pipe(
      take(1),
      map(user => !!(user && this.authService.canRead(user))), // <-- map to boolean
      tap(authenticated => {
      if (!authenticated) {
        console.log('Access Denied. Must login to view content');
        this.router.navigate(['/login']);
      }
    }));
  }

}
