import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackService } from '../services/snack.service';
import { Store, Select } from '@ngxs/store';
import { AuthState } from './state/auth/auth.state';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Select(AuthState.loggedIn) loggedIn$: Observable<boolean>
  constructor(
    private angularFireAuth: AngularFireAuth,
    private snackService: SnackService,
    private store: Store
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    this.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.snackService.authError();
      }
    })
    return this.loggedIn$;

  }
}
