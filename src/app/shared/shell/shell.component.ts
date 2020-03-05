import { Component, OnInit } from '@angular/core';
import { Observable, pipe, combineLatest } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { AuthState } from 'src/app/user/state/auth/auth.state';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  @Select(AuthState.loggedIn) loggedIn$;
  @Select(AuthState.loggedOut) loggedOut$;
  @Select(AuthState.email) email$;
  @Select(AuthState.photoURL) photoURL$;

  isBreakpoint$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }
}
