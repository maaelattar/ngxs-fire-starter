import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable } from 'rxjs';
import { AuthState } from '../state/auth/auth.state';
import { Logout } from '../state/auth/auth.actions';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @Select(AuthState.loggedIn) loggedIn$;
  @Select(AuthState.loggedOut) loggedOut$;
  @Select(AuthState.email) email$;

  constructor(private store: Store) { }

  ngOnInit(): void { }

  @Dispatch() logout = () => new Logout();
}
