import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly _tasks = signal<Task[]>([]);
  readonly filteredTasks = signal<Task[]>([]);

    
  constructor() {
    this.showAllTasks();
  }

  add(description: string) {
    const newTask: Task = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      description: description,
      status: TaskStatus.Active
    };
    this._tasks.update(tasks => [newTask, ...tasks]);
    this.showAllTasks();
  }

  complete(index: number) {
    this._tasks.update(tasks => {
      const updatedTasks = [...tasks];
      if (updatedTasks[index]) {
        updatedTasks[index].status = TaskStatus.Completed;
      }
      return updatedTasks;
    });
  }

  delete(id: number) {
    this._tasks.update(tasks => tasks.filter(task => task.id !== id));
  }
  
  filterTasksByStatus(status: TaskStatus) {
    this.filteredTasks.set(this._tasks().filter(task => task.status === status));
  }

  showAllTasks() {
    this.filteredTasks.set([...this._tasks()]);
  }

  reorderTasks(reorderedTasks: Task[]) {
    this._tasks.set([...reorderedTasks]);
    this.showAllTasks();
  }

  clearCompletedTasks() {
    this._tasks.update(tasks => tasks.filter(task => task.status !== TaskStatus.Completed));
    this.showAllTasks();
  }

}
