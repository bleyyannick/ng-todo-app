import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { ContainerComponent } from "./container/container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ContainerComponent],
  template: `
    <app-header/>
    <app-container>
    </app-container>
  `,
  host: {
    'class': 'root'
  },
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-todo-app';
}
