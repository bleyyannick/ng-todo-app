import { Component, input, output } from '@angular/core';
import { Task, TaskStatus } from '../types';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [],
  template:`
      @for( task of tasks(); let index = $index; track task.id ) { 
        <div class="tasks-list" 
             id="task-list-item"
             draggable="true"
             (drop)="handleDrop($event, $index)"
             (dragstart)="handleDragStart($event, $index)"
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
            <button (click)="clearComputedTasks()">Clear Completed</button>
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

  handleDragStart(event: DragEvent, index: number) {
    this.draggedTaskIndex = index 
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(this.draggedTaskIndex));
    }
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
