import { Component, OnInit, Inject } from '@angular/core';
import { BoardService } from '../../board.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { RemoveTask } from '../../state/board/board.actions';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  @Dispatch()
  removeTask = (boardId, task) => new RemoveTask({ boardId, task });

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.removeTask(this.data.boardId, this.data.task);
    this.dialogRef.close();
  }
}
