import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correo: string = '';
  membresia: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
  
    this.authService.login(this.correo, this.membresia).subscribe(
      (response) => {
        if (response.ok) { 
          const userData = {
            correo: this.correo,
            membresia: this.membresia,
            token: response.data.token
          };
          localStorage.setItem('user', JSON.stringify(userData)); // Guarda toda la información del usuario
          localStorage.setItem('token', response.data.token); // Guarda el token si está presente
          // Show welcome message
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Se ha iniciado sesión correctamente',
            confirmButtonText: 'OK'
          }).then(() => {
            // Redirect to the password change page
            this.router.navigate(['/cambio-password']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Correo o membresía incorrectos',
            text: 'Intente de nuevo',
          }).then(() => {
            this.correo = '';
            this.membresia = '';
          });
        }
      },
      (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un Error',
          text: error.error?.message,
        });
      }
    );
  }
}
