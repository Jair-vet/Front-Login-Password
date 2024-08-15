import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { CambioPasswordComponent } from './cambio-password/cambio-password.component';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CambioPasswordComponent,
    LoaderComponent,
    RecuperarPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
