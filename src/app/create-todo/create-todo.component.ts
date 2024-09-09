import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../types';
import { TasksListComponent } from "../tasks-list/tasks-list.component";
import { TasksService } from '../services/tasks.service';

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
    <app-tasks-list [tasks]="filteredTasks()"/>
  `,
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {
  todo: string = '';
  
  tasksService = inject(TasksService);
  filteredTasks = this.tasksService.filteredTasks;

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.todo.trim() !== '') {
      event.preventDefault();
      this.tasksService.add(this.todo.trim());
      this.todo = ''; 
    } 
  }

  addTask(description: string) {
    this.tasksService.add(description);
  }

  toCompleteTask(index: number) {
    this.tasksService.complete(index);
  }

  reorderTasks(reorderedTasks: Task[]) {
    this.tasksService.reorderTasks(reorderedTasks);
    this.showAllTasks();  
  }

  toDeleteTask(id: number) {
    this.tasksService.delete(id);  
  }

  filterTasks(status: TaskStatus) {
    this.tasksService.filterTasksByStatus(status);
  }

  showAllTasks() {
   this.tasksService.showAllTasks();
  }

  clearCompletedTasks() {
    this.tasksService.clearCompletedTasks(); 
  }
}