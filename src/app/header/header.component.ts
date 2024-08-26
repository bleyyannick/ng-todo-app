import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template:`
    <header>
      <img src="images/bg-desktop-dark.jpg" alt="todo app background"> 
    </header> 
  
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
