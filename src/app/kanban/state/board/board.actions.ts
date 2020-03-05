import { Board, Task } from 'src/app/kanban/board.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

export class GetBoards {
  static readonly type = '[Board] GetBoards';
  constructor() { }
}
export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  constructor(public payload: Board) { }
}
export class SetLoading {
  static readonly type = '[Board] SetLoading';
  constructor() { }
}
export class SetLoaded<T> {
  static readonly type = '[Board] SetLoaded';
  constructor(public payload: T) { }
}
export class SortBoards {
  static readonly type = '[Board] SortBoards';
  constructor(public payload: Board[]) { }
}
export class DeleteBoard {
  static readonly type = '[Board] DeleteBoard';
  constructor(public payload: string) { }
}
export class UpdateTasks {
  static readonly type = '[Board] UpdateTasks';
  constructor(
    public payload: { boardId: string; tasks: Task[] }
  ) { }
}
export class RemoveTask {
  static readonly type = '[Board] RemoveTask';
  constructor(public payload: { boardId: string; task: Task }) { }
}
