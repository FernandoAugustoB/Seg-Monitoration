import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar";
import { HeaderComponent } from "../header/header";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
  imports: [SidebarComponent, HeaderComponent, RouterOutlet]
})
export class MainLayoutComponent {}
