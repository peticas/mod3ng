import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { IEstudiante } from '../models/estudiante';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    RouterOutlet,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  estudiantes: IEstudiante[] = [];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      this.dataSource = new MatTableDataSource<IEstudiante>(this.estudiantes);
      this.dataSource.paginator = this.paginator;
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
