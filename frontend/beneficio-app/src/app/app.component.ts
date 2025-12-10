import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, ],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/grow.png" alt="logo" aria-hidden="true">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=check_box,check_box_outline_blank&display=block" rel="stylesheet" />
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'beneficio-app';
}
