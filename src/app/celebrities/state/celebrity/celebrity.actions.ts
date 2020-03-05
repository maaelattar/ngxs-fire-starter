export class GetCelebrities {
  static readonly type = '[Celebrity] GetCelebrities';
  constructor() { }
}

export class GetCelebrity {
  static readonly type = '[Celebrity] GetCelebrity';
  constructor(public payload: string) { }
}

