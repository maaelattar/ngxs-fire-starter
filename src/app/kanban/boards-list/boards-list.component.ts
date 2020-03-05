import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../board.model';
import { Subscription, Observable } from 'rxjs';
import { BoardService } from '../board.service';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardDialogComponent } from '../dialogs/board-dialog/board-dialog.component';
import { Select, Store } from '@ngxs/store';
import { BoardState } from '../state/board/board.state';
import { GetBoards, SortBoards, CreateBoard } from '../state/board/board.actions';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit, OnDestroy {
  boards: Board[];
  sub: Subscription;
  //boards$: Observable<Board[]>;
  @Select(BoardState.boards) boards$: Observable<Board[]>;
  constructor(
    private store: Store,
    public boardService: BoardService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetBoards());
    this.boards$
      .pipe(
        tap(boards => {
          this.boards = [...boards];
        })
      )
      .subscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
      this.store.dispatch(new SortBoards(this.boards));
    }
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(
          new CreateBoard({
            title: result,
            priority: this.boards.length
          })
        );

      }
    });
  }

  ngOnDestroy() {
    //   this.sub.unsubscribe();
  }
}
