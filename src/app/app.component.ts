import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, Toolbar],
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
