import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { IEstudiante } from '../models/estudiante';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  estudiantes: IEstudiante[] = [];

  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'edad',
    'carrera',
    'acciones',
  ];

  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showEstudiantes();
  }

  showEstudiantes() {
    this.apiService.getEstudiantes().subscribe((estud: IEstudiante[]) => {
      this.estudiantes = estud;
    });
  }

  deleteStudent(id: string, nombre: string, apellido: string): void {
    if (confirm('Esta seguro de eliminar a ' + nombre + ' ' + apellido)) {
      this.apiService.deleteEstudiante(id).subscribe((eliminado) => {
        this.toastService.success(
          'Estudiante Eliminado...',
          '.:REGISTRO DE ESTUDIANTES:.',
          {
            positionClass: 'toast-top-center',
          }
        );
        this.showEstudiantes();
      });
    }
  }
}
