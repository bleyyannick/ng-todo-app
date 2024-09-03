import { Component, input, output } from '@angular/core';
import { Task, TaskStatus } from '../types';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [],
  template:`
      @for( task of tasks(); let index = $index; track task.id ) { 
        <div class="tasks-list" 
             draggable="true"
             (drop)="handleDrop($event, $index)"
             (dragstart)="handleDragStart($index)"
             (dragover)="handleDragOver($event)"> 
          <div [class]="{
              'task': true,
              'completed': task.status === TaskStatus.Completed 
              }">
            <div [class]="{
              'circle': true,
              'circle-completed': task.status === TaskStatus.Completed
            }" (click)="completeTask(index)">
              <img src="images/icon-check.svg" alt="checkmark" />
            </div>
            <div class="task-description">
                <p>{{ task.description }}</p>
            </div>
          </div>
          <div class="task-delete"  (click)="deleteTask(task.id)">
              <img src="images/icon-cross.svg" alt="cross" />
          </div>
        </div>
        } @empty {
          <h2>No tasks to display</h2>
        }
        <div class="tasks-list-footer">
            <p>{{ this.tasks().length }} items left</p>
            <ul>
              <li (click)="allTasks()"><p>All</p></li>
              <li (click)="filterByActiveTasks()"><p>Active</p></li>
              <li (click)="filterByCompletedTasks()"><p>Completed</p></li>
            </ul>
            <p (click)="clearComputedTasks()">Clear Completed</p>
        </div>
   
    `,
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {

  private draggedTaskIndex!:number
  
   tasks = input.required<Task[]>();
   TaskStatus = TaskStatus;
   onCompleted = output<number>();
   onDeleted = output<number>();
   onFilter = output<TaskStatus>();
   onShowAll = output<Task[]>();
   onClearComputedTasks = output<void>();
   onReorder = output<Task[]>();

   completeTask( taskId: number ) {
    this.onCompleted.emit(taskId);
   }
   deleteTask(taskId: number) {
    this.onDeleted.emit(taskId);
   }

  filterByActiveTasks() {
    this.onFilter.emit(TaskStatus.Active);
    }
  filterByCompletedTasks() {
    this.onFilter.emit(TaskStatus.Completed);
    }
  allTasks() {  
    this.onShowAll.emit([...this.tasks()]);
  }
  clearComputedTasks() {
    this.onClearComputedTasks.emit();
  }

  handleDragStart(index: number) {
    this.draggedTaskIndex = index 
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  handleDrop(event: DragEvent, dropIndex: number) {
      event.preventDefault();

      if (this.draggedTaskIndex !== dropIndex) {
        const updatedTasks = [...this.tasks()];
        const [draggedTask] = updatedTasks.splice(this.draggedTaskIndex, 1);
        updatedTasks.splice(dropIndex, 0, draggedTask);
        this.onReorder.emit(updatedTasks);
      }
    }
}
