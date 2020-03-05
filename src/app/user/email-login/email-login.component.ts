import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Selector, Select, Store, Actions } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthState } from '../state/auth/auth.state';
import { ClearServerMessage, SignInWithEmail, CreateUserWithEmail, SendPasswordResetEmail } from '../state/auth/auth.actions';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  @Select(AuthState.serverMessage) serverMessage$;

  constructor(
    private store: Store,
    private actions: Actions,
    private angularFireAuth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []]
    });
  }

  changeType(val) {
    this.type = val;
    this.store.dispatch(new ClearServerMessage());
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  @Dispatch()
  // tslint:disable-next-line: semicolon
  login = (email, password) => new SignInWithEmail({ email, password });

  @Dispatch()
  // tslint:disable-next-line: semicolon
  signup = (email, password) => new CreateUserWithEmail({ email, password });

  @Dispatch()
  // tslint:disable-next-line: semicolon
  resetPassword = email => new SendPasswordResetEmail({ email });

  async onSubmit() {

    const email = this.email.value;
    const password = this.password.value;


    if (this.isLogin) {
      this.login(email, password);
    }
    if (this.isSignup) {
      this.signup(email, password);
    }
    if (this.isPasswordReset) {
      this.resetPassword(email);

    }

  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearServerMessage());
  }
}
