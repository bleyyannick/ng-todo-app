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
          (keydown)="onEnter($event)" />
      </div>
    </form>
    <app-tasks-list 
      [tasks]="filteredTasks()"  
      (onFilter)="filterTasks($event)"
      (onShowAll)="showAllTasks()"
      (onCompleted)="toCompleteTask($event)"
      (onDeleted)="toDeleteTask($event)"
      (onClearComputedTasks)="clearCompletedTasks()"
      (onReorder)="reorderTasks($event)"
    />
  `,
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {
  todo: string = '';
  private readonly tasks = signal<Task[]>([]);
  readonly filteredTasks = signal<Task[]>([]);

  constructor() {
    this.showAllTasks();
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.todo.trim() !== '') {
      event.preventDefault();
      this.addTask(this.todo.trim());
      this.todo = ''; 
    }
  }

  addTask(description: string) {
    const newTask: Task = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      description: description,
      status: TaskStatus.Active
    };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.showAllTasks();
  }

  toCompleteTask(index: number) {
    this.tasks.update(tasks => {
      const updatedTasks = [...tasks];
      if (updatedTasks[index]) {
        updatedTasks[index].status = TaskStatus.Completed;
      }
      return updatedTasks;
    });
    this.showAllTasks(); 
  }

  reorderTasks(reorderedTasks: Task[]) {
    this.tasks.set([...reorderedTasks]);
    this.showAllTasks();  
  }

  toDeleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id)); 
    this.showAllTasks();  
  }

  filterTasks(status: TaskStatus) {
    this.filteredTasks.update(() => this.tasks().filter(task => task.status === status));
  }

  showAllTasks() {
    this.filteredTasks.update(() => [...this.tasks()]);
  }

  clearCompletedTasks() {
    this.tasks.update(tasks => tasks.filter(task => task.status !== TaskStatus.Completed));
    this.showAllTasks();  
  }
}