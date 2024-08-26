import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header />
  `,
  host: {
    'class': 'root'
  },
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-todo-app';
}
