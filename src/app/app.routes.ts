import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEstudianteComponent } from './components/dashboard/add-estudiante/add-estudiante.component';
import { EditEstudianteComponent } from './components/dashboard/edit-estudiante/edit-estudiante.component';

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
    path: 'editestudiante/:id',
    component: EditEstudianteComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  },
];
