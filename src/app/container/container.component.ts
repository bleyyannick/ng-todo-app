import { Component } from '@angular/core';
import { CreateTodoComponent } from "../create-todo/create-todo.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CreateTodoComponent],
  template:`
     <main>  
       <div>
          <h1>TODO</h1>
          <img src="images/icon-sun.svg" alt=" sun theme icon" />
       </div>
       <app-create-todo />
    </main>
  
  `,
  styleUrl: './container.component.css'
})
export class ContainerComponent {

}
