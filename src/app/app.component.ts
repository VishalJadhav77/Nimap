import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container">
      
      <nav>
        <a routerLink="/categories" class="btn btn-primary">Categories</a>
        <a routerLink="/products" class="btn btn-primary">Products</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .container {
        margin: 20px;
      }
      nav {
        margin-bottom: 20px;
      }
      a {
        margin-right: 10px;
      }
    `,
  ],
})
export class AppComponent {}
