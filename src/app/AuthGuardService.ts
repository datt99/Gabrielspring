import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  isLoggedIn = false;

  constructor(private router: Router) {
  }

  setLoggedIn() {
    this.isLoggedIn = true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    const {router} = this;

    if (!sessionStorage.getItem('user')) {
      router.navigate(['./login']);
      this.isLoggedIn = false;
      return false;
    }

    return new Observable<boolean>((observer) => {
      observer.next(true);
      observer.complete();
      this.isLoggedIn = true;
    });
  }

  signOut() {
    this.isLoggedIn = false;
  }
}
