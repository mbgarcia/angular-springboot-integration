import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    MatToolbarModule, 
    MatIconModule,
    MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  private sidebarOpened = signal(true);

  toggleSidebar() {
    this.sidebarOpened.set(this.sidebarOpened() ? false : true);
  }

  sidebarOpened$() {
    return this.sidebarOpened;
  }
}
