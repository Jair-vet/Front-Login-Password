import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './recuperar-membresia.component.html',
  styleUrls: ['./recuperar-membresia.component.scss']
})
export class RecuperarMembresiaComponent {
  correo: string = '';
  password: string = '';
  membresia: string | null = null; // Store the retrieved membership
  isLoading: boolean = false; // Loading state indicator
  showMembresia: boolean = false; // Control the display of membership

  constructor(private authService: AuthService) {}

  onSearch() {
    this.isLoading = true;
    this.authService.obtainMembresia(this.correo, this.password).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.ok) {
          this.membresia = response.membresia;
          this.showMembresia = true;
          Swal.fire({
            icon: 'success',
            title: 'Validación exitosa',
            text: `Tu membresía es: ${response.membresia}`,
          });
        } else {
          this.showMembresia = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message,
          });
        }
      },
      (error) => {
        this.isLoading = false;
        this.showMembresia = false;
        Swal.fire({
          icon: 'error',
          title: 'Error en la solicitud',
          text: 'No se pudo validar la membresía. Inténtalo de nuevo más tarde.',
        });
      }
    );
  }
}
