import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent {
  correo: string = '';
  membresia: string = '';
  newPassword: string = '';
  isLoading: boolean = false;
  userExists: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSearchRecords() {
    this.isLoading = true;
    this.authService.checkMembership(this.correo, this.membresia).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.ok) {
          this.userExists = true; // Unlock the new password section
          Swal.fire({
            icon: 'success',
            title: 'Usuario encontrado',
            text: 'Puedes cambiar la contraseña ahora.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'Verifica el correo y la membresía.',
          });
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al buscar el usuario.',
        });
      }
    );
  }

  onChangePassword() {
    this.isLoading = true;
    this.authService.updatePasswordCliente(this.correo, this.membresia, this.newPassword).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Contraseña cambiada',
            text: 'Tu contraseña ha sido actualizada correctamente.',
          }).then(() => {
            this.resetForm();
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al cambiar la contraseña',
            text: response.message || 'Intenta de nuevo más tarde.',
          });
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cambiar la contraseña.',
        });
      }
    );
  }

  resetForm() {
    this.correo = '';
    this.membresia = '';
    this.newPassword = '';
    this.userExists = false;
  }
}
