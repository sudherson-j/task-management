import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task-list/task-list.component';

@Component({
  selector: 'app-action-table',
  template: `
    <button
      mat-icon-button
      color="primary"
      *ngIf="task.status === 'Pending'"
      (click)="onActionClick('Make Completed')"
    >
      <mat-icon>check_circle</mat-icon>
    </button>
    <button mat-icon-button color="primary" *ngIf="task.status === 'Completed'">
      <mat-icon>thumb_up</mat-icon>
    </button>
  `,
})
export class ActionTableComponent {
  @Input('task') task!: Task;
  @Output() actionClicked = new EventEmitter<any>();

  onActionClick(action: string) {
    this.actionClicked.emit({ task: this.task, action: action });
  }
}
