import { Component } from '@angular/core';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [],
  template: `
     <form>
      <div class="create-todo">
         <div class="circle"></div>
       <input type="text" placeholder="Create a new todo..." />
      </div>
    </form>

  `, 
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {

}
