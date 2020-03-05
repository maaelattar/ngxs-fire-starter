export class SetLoading {
  static readonly type = 'Auth SetLoading';
  constructor() {}
}
export class SetLoaded {
  static readonly type = 'Auth SetLoaded';
  constructor() {}
}
export class SignInWithGoogle {
  static readonly type = '[Auth] SignInWithGoogle';
  constructor() {}
}
export class SignInWithEmail {
  static readonly type = '[Auth] SignInWithEmail';
  constructor(public payload: { email: string; password: string }) {}
}
export class CreateUserWithEmail {
  static readonly type = '[Auth] CreateUserWithEmail';
  constructor(public payload: { email: string; password: string }) {}
}
export class SendPasswordResetEmail {
  static readonly type = '[Auth] SendPasswordResetEmail';
  constructor(public payload: { email: string }) {}
}
export class Logout {
  static readonly type = '[Auth] Logout';
  constructor() {}
}
export class AuthStateChanged {
  static readonly type = '[Auth] AuthStateChanged';
  constructor(public payload: firebase.User) {}
}
export class ClearServerMessage {
  static readonly type = '[Auth] ClearServerMessage';
  constructor() {}
}
