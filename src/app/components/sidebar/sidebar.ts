import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="bg-gray-800 text-white min-h-screen w-64">
      <div class="p-4">
        <!-- Logo -->
        <img src="path/to/logo.png" alt="Logo" class="w-full mb-4">

        <!-- Navigation Links -->
        <ul>
          <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
          <li><a routerLink="/clients" routerLinkActive="active">Clients</a></li>
          <li><a routerLink="/cameras" routerLinkActive="active">Cameras</a></li>
          <li><a routerLink="/kanban" routerLinkActive="active">Kanban Cards</a></li>
          <li><a routerLink="/notifications" routerLinkActive="active">Notifications</a></li>
          <li><a routerLink="/messaging" routerLinkActive="active">Messaging</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .bg-gray-800 {
      background-color: #1a202c;
    }
    .text-white {
      color: white;
    }
    nav ul li a {
      display: block;
      padding: 0.5rem 1rem;
      text-decoration: none;
      transition: background-color 0.3s;
    }
    nav ul li a.active {
      background-color: #2d3748;
    }
  `]
})
export class SidebarComponent {}
