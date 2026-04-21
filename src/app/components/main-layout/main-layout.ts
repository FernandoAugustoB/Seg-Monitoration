import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <div class="flex">
      <app-sidebar></app-sidebar>
      <div class="flex-grow bg-gray-900">
        <app-header></app-header>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .flex {
      display: flex;
    }
    .flex-grow {
      flex-grow: 1;
    }
    .bg-gray-900 {
      background-color: #121212;
    }
  `]
})
export class MainLayoutComponent {}
