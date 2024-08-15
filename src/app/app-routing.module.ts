import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CambioPasswordComponent } from './cambio-password/cambio-password.component';
import { AuthGuard } from './guards/auth.guard';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { RecuperarMembresiaComponent } from './recuperar-membresia/recuperar-membresia.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cambio-password', component: CambioPasswordComponent, canActivate: [AuthGuard] },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'recuperar-membresia', component:  RecuperarMembresiaComponent},
  { path: '**', redirectTo: 'login' } // Redirige cualquier ruta no definida al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
