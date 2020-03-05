import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SignInWithGoogle } from './state/auth/auth.actions';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
  constructor(private angularFireAuth: AngularFireAuth) { }
  @Dispatch() signInWithGoogle = () => new SignInWithGoogle();
  @HostListener('click')
  onclick() {
    this.signInWithGoogle();
  }
}
