import { State, NgxsOnInit, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';
import {
  AuthStateChanged,
  Logout,
  SignInWithGoogle,
  SignInWithEmail,
  CreateUserWithEmail,
  SendPasswordResetEmail,
  ClearServerMessage
} from './auth.actions';
import { auth } from 'firebase';
import { Injectable } from '@angular/core';
import { LoadableStateModel } from 'src/app/shared/loadable-state/loadable';

export interface AuthStateModel {
  loggedIn: boolean;
  email: string;
  photoURL: string;
  serverMessage;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedIn: false,
    email: '',
    photoURL: '',
    serverMessage: ''
  }
})
@Injectable()
export class AuthState implements NgxsOnInit {

  @Selector()
  static loggedIn(state: AuthStateModel) {
    return state.loggedIn;
  }
  @Selector()
  static loggedOut(state: AuthStateModel) {
    return !state.loggedIn;
  }

  @Selector()
  static email(state: AuthStateModel) {
    return state.email;
  }

  @Selector()
  static photoURL(state: AuthStateModel) {
    return state.photoURL;
  }

  @Selector()
  static serverMessage(state: AuthStateModel) {
    return state.serverMessage;
  }

  constructor(private angularFireAuth: AngularFireAuth) {
  }
  ngxsOnInit({ patchState, dispatch }: StateContext<AuthStateModel>) {

    this.angularFireAuth.authState
      .pipe(
        tap(user => {
          if (!!user) {
            patchState({
              loggedIn: !!user,
              email: user.email || ''
            })
          }
          else {
            patchState({ loggedIn: false, email: '' });
          }
        })
      )
      .subscribe();

  }

  @Action(SignInWithGoogle)
  async signInWithGoogle(
    { patchState }: StateContext<AuthStateModel>,
    action: SignInWithGoogle
  ) {
    await this.angularFireAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(userCredential => {
        patchState({
          loggedIn: true,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          serverMessage: ''
        });
      })
      .catch(error => {
        patchState({
          serverMessage: error.message
        });
      });
  }

  @Action(SignInWithEmail)
  async signInWithEmail(
    { patchState }: StateContext<AuthStateModel>,
    action: SignInWithEmail
  ) {
    const { email, password } = action.payload;
    await this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        patchState({
          loggedIn: true,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          serverMessage: ''
        });
      })
      .catch(error => {
        patchState({
          serverMessage: error.message
        });
      });
  }

  @Action(CreateUserWithEmail)
  async CreateUserWithEmail(
    { patchState }: StateContext<AuthStateModel>,
    action: CreateUserWithEmail
  ) {
    const { email, password } = action.payload;
    const userCredential = await this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        patchState({
          loggedIn: true,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          serverMessage: ''
        });
      })
      .catch(error => {
        patchState({
          serverMessage: error.message
        });
      });
  }
  @Action(SendPasswordResetEmail)
  async sendPasswordResetEmail(
    { patchState }: StateContext<AuthStateModel>,
    action: SendPasswordResetEmail
  ) {
    const { email } = action.payload;
    await this.angularFireAuth.auth
      .sendPasswordResetEmail(email)
      .then(userCredential => {
        patchState({
          serverMessage: ''
        });
      })
      .catch(error => {
        patchState({
          serverMessage: error.message
        });
      });
  }

  @Action(Logout)
  async logout({ patchState }: StateContext<AuthStateModel>, action: Logout) {
    await this.angularFireAuth.auth.signOut();
    patchState({ loggedIn: false, email: '' });
  }

  @Action(ClearServerMessage)
  clearServerMessage({ patchState }: StateContext<AuthStateModel>) {
    patchState({ serverMessage: '' });
  }
}
