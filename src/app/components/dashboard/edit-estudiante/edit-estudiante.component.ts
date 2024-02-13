import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { IEstudiante } from '../../models/estudiante';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-estudiante',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    NavbarComponent,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './edit-estudiante.component.html',
  styleUrl: './edit-estudiante.component.css',
})
export class EditEstudianteComponent implements OnInit {
  estudiante: IEstudiante | undefined;
  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadEstudiante(<string>this.activeRouter.snapshot.paramMap.get('id'));
  }

  formEditStudent = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    edad: new FormControl<number>(1, {
      validators: Validators.required,
      nonNullable: true,
    }),
    carrera: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  editStudent(): void {
    this.apiService
      .updateEstudiante(
        <string>this.estudiante?.id,
        <IEstudiante>this.formEditStudent.value
      )
      .subscribe((datos) => {
        console.log('Editado');
        this.toastService.success(
          'Estudiante Editado...',
          '.:REGISTRO DE ESTUDIANTES:.',
          {
            positionClass: 'toast-top-center',
          }
        );
        this.router.navigate(['/dashboard']);
      });
  }

  loadEstudiante(id: string) {
    this.apiService.getEstudiante(id).subscribe((estud: IEstudiante) => {
      this.estudiante = estud;
      //console.log(this.estudiante);
      this.formEditStudent.controls['apellido'].setValue(
        this.estudiante.apellido
      );
      this.formEditStudent.controls['carrera'].setValue(
        this.estudiante.carrera
      );
      this.formEditStudent.controls['edad'].setValue(this.estudiante.edad);
      this.formEditStudent.controls['nombre'].setValue(this.estudiante.nombre);
    });
  }
}
