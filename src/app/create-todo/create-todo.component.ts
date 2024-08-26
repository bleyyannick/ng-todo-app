import { Component } from '@angular/core';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [],
  template: `
     <form>
       <input type="text" placeholder="Create a new todo..." />
    </form>

  `, 
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {

}
