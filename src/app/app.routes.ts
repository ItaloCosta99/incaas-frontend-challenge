import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'partes',
    loadComponent: () =>
      import('./pages/partes/partes.component').then((m) => m.PartesComponent),
    title: 'Cadastro de Partes',
  },
  { path: '', redirectTo: 'partes', pathMatch: 'full' },
  { path: '**', redirectTo: 'partes' }, // Rota curinga
];
