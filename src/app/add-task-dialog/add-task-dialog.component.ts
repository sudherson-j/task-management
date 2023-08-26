import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent {
  newTaskTitle: string = '';
  newTaskStatus: string = 'Pending';

  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>) {}

  addTask(): void {
    if (this.newTaskTitle && this.newTaskStatus) {
      this.dialogRef.close({
        title: this.newTaskTitle,
        status: this.newTaskStatus,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
