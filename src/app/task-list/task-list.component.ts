import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

export interface Task {
  id: number;
  title: string;
  status: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'status', 'actions'];
  tasks!: MatTableDataSource<Task>;
  selectedStatus: string = 'All';

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Retrieve tasks from local storage when the component initializes
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = new MatTableDataSource(JSON.parse(storedTasks));
    } else {
      this.tasks = new MatTableDataSource([
        {
          id: 1,
          title: 'To do sprint planning before starts',
          status: 'Pending',
        },
        {
          id: 2,
          title: 'To conduct sprint retrosprective',
          status: 'Completed',
        },
        {
          id: 3,
          title: 'To create figma design of dashboard',
          status: 'Pending',
        },
        {
          id: 4,
          title: 'To add dashbord feature with multiple charts',
          status: 'Completed',
        },
        {
          id: 5,
          title: 'To do database configuration for microservices',
          status: 'Pending',
        },
        {
          id: 6,
          title: 'To create websockets for all notification kind of things',
          status: 'Completed',
        },
        {
          id: 7,
          title: 'To do full calendar view with multiple event creation',
          status: 'Pending',
        },
        {
          id: 8,
          title: 'To add angular components for home page',
          status: 'Completed',
        },
        // Add more tasks here
      ]);
    }
  }

  performAction(data: any) {
    switch (data.action) {
      case 'Make Completed':
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            message: `Are you sure you want to mark '${data.task.title}' as completed?`,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result === true) {
            this.tasks.data.map((t: Task) => {
              if (data.task.id === t.id) t.status = 'Completed';
            });
          }
        });
        break;
    }
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTask(result.title, result.status);
        this.cdr.detectChanges();
      }
    });
  }

  addTask(newTaskTitle: string, newTaskStatus: string) {
    const newTask: Task = {
      id: this.tasks.data.length + 1,
      title: newTaskTitle,
      status: newTaskStatus,
    };
    const newData = [...this.tasks.data];
    newData.push(newTask);
    this.tasks.data = newData;
    localStorage.setItem('tasks', JSON.stringify(this.tasks.data));
  }

  applyFilterByStatus(filterValue: string): void {
    this.selectedStatus = filterValue;
  }

  getFilteredTasks(): Task[] {
    if (this.selectedStatus === 'All') {
      return this.tasks.data;
    }
    return this.tasks.data.filter(
      (task) => task.status === this.selectedStatus
    );
  }
}
