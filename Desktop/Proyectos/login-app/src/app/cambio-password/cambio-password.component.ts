import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.scss']
})
export class CambioPasswordComponent implements OnInit {
  cliente: any = { correo: '', membresia: '' };
  newPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // Obtener la información del usuario desde el localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.cliente.correo = userData.correo;
      this.cliente.membresia = userData.membresia;
    } else {
      this.router.navigate(['/login']);
    }
  }

  isTokenValid(token: string): boolean {
    return !!token; 
  }
  

  onSubmit(): void {
    const token = localStorage.getItem('token');
    
    console.log(this.cliente.correo, this.cliente.membresia, this.newPassword);
    if (token) {
      this.authService.updatePassword(this.cliente.correo, this.cliente.membresia, this.newPassword).subscribe(
        (response) => {
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Contraseña actualizada exitosamente',
            }).then(() => {
              // Opcional: Redirigir o limpiar el formulario si es necesario
              window.location.href = 'https://www.stown.mx/pages/owners-club';
              localStorage.removeItem('token');
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar la contraseña',
            });
          }
        },
        (error) => {
          console.error('Error al actualizar la contraseña', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar la contraseña. Intente de nuevo más tarde.',
          });
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
  

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
