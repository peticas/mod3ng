import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEstudianteComponent } from './components/dashboard/add-estudiante/add-estudiante.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'addestudiate',
    component: AddEstudianteComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  },
];
