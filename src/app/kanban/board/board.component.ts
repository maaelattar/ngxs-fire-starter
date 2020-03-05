import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task, Board } from '../board.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { Store } from '@ngxs/store';
import { UpdateTasks, DeleteBoard } from '../state/board/board.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board: Board;

  taskDrop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const tasksUpdate = [...this.board.tasks];
      moveItemInArray(tasksUpdate, event.previousIndex, event.currentIndex);
      this.store.dispatch(
        new UpdateTasks({
          boardId: this.board.id,
          tasks: tasksUpdate
        })
      );
    }
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.store.dispatch(
            new UpdateTasks({
              boardId: this.board.id,
              tasks: [...this.board.tasks, result.task]
            })
          );

        } else {
          const update = [...this.board.tasks];
          update.splice(result.idx, 1, result.task);
          this.store.dispatch(
            new UpdateTasks({
              boardId: this.board.id,
              tasks: update
            })
          );
        }
      }
    });
  }

  handleDelete() {
    this.store.dispatch(new DeleteBoard(this.board.id));
  }

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }
}
