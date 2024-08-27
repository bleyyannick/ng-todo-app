import { Component, input } from '@angular/core';
import { Task } from '../types';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [],
  template:` 
    <div class="tasks-list">
      @for( task of this.tasks(); track task.id ) {
        <div class="task">
           {{ task.description }}
        </div>
      }
    </div>`,
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  
   tasks = input<Task[]>();
}
