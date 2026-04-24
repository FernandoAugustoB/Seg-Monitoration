import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
  imports: [Sidebar, Header, RouterOutlet]
})
export class MainLayout {}
