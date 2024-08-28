import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../types';
import { TasksListComponent } from "../tasks-list/tasks-list.component";

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
         (keydown)="onEnter($event, todo)" />
      </div>
    </form>
    <app-tasks-list 
     [tasks]="filteredTasks()"  
     (onFilterByActive)="filterActiveTasks()"
     (onFilterByCompleted)="filterCompletedTasks()"
     (onShowAll)="showAllTasks()"
     (onCompleted)="toCompleteTask($event)"
     (onDeleted)="toDeleteTask($event)"/>
  `, 
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {

  todo :string = '';
  private readonly tasks = signal<Task[]>([]);
  readonly filteredTasks = signal<Task[]>([...this.tasks()]);

  onEnter(event: KeyboardEvent, task: string) {
    if( event.key === 'Enter' ) {
      event.preventDefault();
      this.addTask(task);
      this.todo = '';
      this.showAllTasks();
    }
  }

  addTask(input: string) {
    if(input.trim() !== '' ) {
      this.tasks.update(tasks => {
        const newTask: Task = {
          id:  Date.now() + Math.floor(Math.random() * 1000),
          description: this.todo,
          status: TaskStatus.Active
        }
        return [...tasks, newTask];
      });
    }
  }

  toCompleteTask(selectedTaskId: number) {
    this.tasks.update(tasks => {
      const taskIndex = tasks.findIndex(task => task.id === selectedTaskId);
      tasks[taskIndex].status = TaskStatus.Completed;
      return [...tasks];
    });
    this.showAllTasks();
  }

  toDeleteTask(id: number) {
    this.tasks.update(tasks => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      return [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    });
    this.showAllTasks();
  }

  filterActiveTasks() {
    this.filteredTasks.update(() => {
      return [...this.tasks()].filter(task => task.status === TaskStatus.Active);
    });
  }

  filterCompletedTasks() {
    this.filteredTasks.update(() => {
      return [...this.tasks()].filter(task => task.status === TaskStatus.Completed);
    });
  }

  showAllTasks() {  
    this.filteredTasks.update(() => [...this.tasks()]);
  }

}