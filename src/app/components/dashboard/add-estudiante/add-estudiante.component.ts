import { Component } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-estudiante',
  standalone: true,
  imports: [
    NavbarComponent,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-estudiante.component.html',
  styleUrl: './add-estudiante.component.css',
})
export class AddEstudianteComponent {
  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  formNewStudent = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    //edad: new FormControl<number | null>(1, [Validators.required]),
    edad: new FormControl<number>(1, {
      validators: Validators.required,
      nonNullable: true,
    }),
    carrera: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  addStudent(): void {
    this.apiService
      .createEstudiante(<IEstudiante>this.formNewStudent.value)
      .subscribe((datos) => {
        console.log('Guardado');
        this.toastService.success(
          'Estudiante Registrado...',
          '.:REGISTRO DE ESTUDIANTES:.',
          {
            positionClass: 'toast-top-center',
          }
        );
        this.router.navigate(['/dashboard']);
      });
  }
}
