import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../types';
import { TasksListComponent } from "../tasks-list/tasks-list.component"; // Import the TaskStatus enum from the appropriate location

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [FormsModule, TasksListComponent],
  template: `
     <form>
      <div class="create-todo">
         <div class="circle"></div>
       <input 
         type="text" 
         placeholder="Create a new todo..."
         [(ngModel)]="todo"
         name="todo"
         (keydown)="onEnter($event)" />
      </div>
    </form>
    <app-tasks-list [tasks]="this.tasksList()"/>

  `, 
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {

  todo :string = '';
  tasksList = signal<Task[]>([]);

onEnter(event: KeyboardEvent) {
  if( event.key === 'Enter' ) {
    this.addTask(this.todo);
  }
  this.todo = '';
}
addTask(input: string) {
  if(input.trim() !== '' ) {
    this.tasksList.update(tasks => {
      const newTask: Task = {
        id: Math.floor((Math.random() * 1) * this.todo.length),
        description: this.todo,
        status: TaskStatus["Todo"]
      }
      return [...tasks, newTask];
    })
    
  }

}


}
