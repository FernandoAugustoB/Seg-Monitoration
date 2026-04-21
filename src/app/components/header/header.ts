import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-gray-800 text-white flex items-center justify-between p-4">
      <!-- Quick Search -->
      <input type="text" placeholder="Search..." class="bg-gray-700 text-white rounded px-2 py-1 w-full">

      <!-- User Profile/Logout -->
      <div>
        <button class="bg-gray-700 hover:bg-gray-600 text-white rounded px-3 py-1">Profile</button>
        <button class="bg-red-500 hover:bg-red-400 text-white ml-2 rounded px-3 py-1">Logout</button>
      </div>
    </header>
  `,
  styles: [`
    .bg-gray-800 {
      background-color: #1a202c;
    }
    .text-white {
      color: white;
    }
    input[type="text"] {
      border: none;
    }
    button {
      margin-left: 1rem;
    }
  `]
})
export class HeaderComponent {}
