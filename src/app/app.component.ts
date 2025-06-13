import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    ToolbarModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'incaas-frontend-challenge';
  items: MenuItem[] = [
    {
      label: 'Cadastro de Partes',
      icon: 'pi pi-fw pi-users',
      routerLink: ['/partes'],
    },
    {
      label: 'Consulta de Processos',
      icon: 'pi pi-fw pi-search',
      routerLink: ['/processos'],
    },
  ];
}
