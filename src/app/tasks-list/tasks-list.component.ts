import { Component, input, output, signal } from '@angular/core';
import { Task, TaskStatus } from '../types';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [],
  template:`
      @for( task of tasks(); track task.id ) { 
        <div class="tasks-list">
          <div [class]="{
            'task': true,
            'completed': task.status === TaskStatus.Completed
          }">
            <div [class]="{
              'circle': true,
              'circle-completed': task.status === TaskStatus.Completed
            }" (click)="completeTask(task.id)">
              <img src="images/icon-check.svg" alt="checkmark" />
            </div>
            <div >
                {{ task.description }}
            </div>
          </div>
          <div (click)="deleteTask(task.id)">
              <img  src="images/icon-cross.svg" alt="cross" />
          </div>
        </div>
        } @empty {
          <h2>No tasks to display</h2>
        }
          <div class="tasks-list">
            <p>{{ this.tasks().length }} items left</p>
            <ul>
              <li (click)="allTasks()">All</li>
              <li (click)="filterByActiveTasks()">Active</li>
              <li (click)="filterByCompletedTasks()">Completed</li>
           </ul>
            <button>Clear Completed</button>
          </div>
   
    `,
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  
   tasks = input.required<Task[]>();
   TaskStatus = TaskStatus;
   onCompleted = output<number>();
   onDeleted = output<number>();
   onAllTasks = output<Task[]>();
   onFilterByActive = output<TaskStatus>();
   onFilterByCompleted = output<TaskStatus>();
   onShowAll = output<Task[]>();

   completeTask( taskId: number ) {
    this.onCompleted.emit(taskId);
   }
   deleteTask(taskId: number) {
    this.onDeleted.emit(taskId);
   }

  filterByActiveTasks() {
    this.onFilterByActive.emit(TaskStatus.Active);
    }
  filterByCompletedTasks() {
    this.onFilterByCompleted.emit(TaskStatus.Completed);
    }
  allTasks() {  
    this.onShowAll.emit([...this.tasks()]);
  }

}
