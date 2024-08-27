import { Component, input, output } from '@angular/core';
import { Task } from '../types';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [],
  template:`
  @for( task of this.tasks(); track task.id ) { 
    <div class="tasks-list" draggable="true">
      <div class="task">
        <div class="circle" (click)="completeTask(task)">
          <img src="images/icon-check.svg" alt="checkmark" />
        </div>
        <div >
            {{ task.description }}
        </div>
      </div>
      <div (click)="deleteTask(task)">
          <img  src="images/icon-cross.svg" alt="cross" />
       </div>
    </div>
    } @empty {
      <h2>No tasks to display</h2>
    }`,
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  
   tasks = input<Task[]>();

   onCompleted = output<Task>();
   onDeleted = output<Task>();

   completeTask( task: Task ) {
    console.log('Task completed');
    this.onCompleted.emit(task);
   }
   deleteTask(task: Task) {
    console.log('Task deleted');
    this.onCompleted.emit(task);
   }

}
