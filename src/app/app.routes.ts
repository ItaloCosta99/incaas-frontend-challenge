import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'partes',
    loadComponent: () =>
      import('./pages/partes/partes.component').then((m) => m.PartesComponent),
    title: 'Cadastro de Partes',
  },
  {
    path: 'processos',
    loadComponent: () =>
      import('./pages/processos/processo.component').then(
        (m) => m.ProcessoComponent
      ),
    title: 'Consulta de Processos',
  },
  { path: '', redirectTo: 'partes', pathMatch: 'full' },
  { path: '**', redirectTo: 'partes' },
];
