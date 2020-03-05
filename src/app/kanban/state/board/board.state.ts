import {
  State,
  NgxsOnInit,
  Selector,
  StateContext,
  Actions,
  Action
} from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import {
  CreateBoard,
  SortBoards,
  DeleteBoard,
  UpdateTasks,
  RemoveTask,
  GetBoards
} from './board.actions';
import { Injectable } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Board } from '../../board.model';
import { BoardService } from '../../board.service';
import { LoadableStateModel } from 'src/app/shared/loadable-state/loadable';
export interface BoardStateModel extends LoadableStateModel {
  boards: Board[];
}

@State<BoardStateModel>({
  name: 'board',
  defaults: { boards: [], loading: true, loaded: false }
})
@Injectable()
export class BoardState {
  @Selector() static loading(state: BoardStateModel) {
    return state.loading;
  }
  @Selector() static loaded(state: BoardStateModel) {
    return state.loaded;
  }
  @Selector() static boards(state: BoardStateModel) {
    return state.boards;
  }
  constructor(private boardService: BoardService) { }

  @Action(GetBoards)
  getBoards({ patchState }: StateContext<BoardStateModel>) {
    ('get boards stateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    this.boardService
      .getUserBoards()
      .pipe(
        tap(boards => {
          patchState({ boards, loading: false, loaded: true });
        })
      )
      .subscribe();
  }
  @Action(CreateBoard)
  async createBoard(
    { patchState }: StateContext<BoardStateModel>,
    action: CreateBoard
  ) {
    await this.boardService.createBoard(action.payload);
  }
  @Action(SortBoards)
  async sortBoards(
    { patchState }: StateContext<BoardStateModel>,
    action: SortBoards
  ) {
    patchState({ boards: action.payload });
    await this.boardService.sortBoards(action.payload);
  }
  @Action(DeleteBoard)
  async deleteBoard(
    { patchState }: StateContext<BoardStateModel>,
    action: DeleteBoard
  ) {
    await this.boardService.deleteBoard(action.payload);
  }
  @Action(UpdateTasks)
  async updateTasks(ctx: StateContext<BoardStateModel>, action: UpdateTasks) {
    const { boardId, tasks } = action.payload;
    let currentBoard = ctx.getState().boards.find(v => v.id === boardId);

    ctx.setState(
      patch({
        boards: updateItem<Board>(
          stateBoard => stateBoard.id === boardId,
          { ...currentBoard, tasks: tasks }
        )
      })
    );

    await this.boardService.updateTasks(boardId, tasks)
  }

  @Action(RemoveTask)
  async removeTask(
    { patchState }: StateContext<BoardStateModel>,
    action: RemoveTask
  ) {
    const { boardId, task } = action.payload;
    await this.boardService.removeTask(boardId, task);
  }
}
