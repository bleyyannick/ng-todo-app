import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template:`
   <header>
      <img 
        src="images/bg-desktop-dark.jpg" 
        srcset="images/bg-desktop-dark.jpg 750w,
          images/bg-mobile-dark.jpg 375w"
        sizes="(max-width: 375px) 375px, 
               (min-width: 376px) and (max-width: 750px) 750px, 
              100vw" 
        alt="todo app background">
    </header>
  
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
