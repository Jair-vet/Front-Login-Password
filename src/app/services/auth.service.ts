import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'https://binteapi.com:4012/api';
  private apiUrl = 'http://localhost:4012/api';
  
  constructor(private http: HttpClient) {}
  get token(): string {
    return (
      //   localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM1NjY3MjZ9.ONstPrxCZdX3HoARI2LXrfVzANHjdv7NHQeaBrQdVck'
    );
  }
  get path(): string {
    return 'users';
  }
  // get headers() {
  //   return {
  //     headers: {
  //       'token': this.token,
  //     },
  //   };
  // }
  private get headers(): HttpHeaders {
    const token = this.token;
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }


  login(correo: string, membresia: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { correo, membresia });
  }

  updatePassword(correo: string, membresia: string, newPassword: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/users/password`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // El encabezado debe tener el prefijo "Bearer"
    });
    return this.http.post<ApiResponse>(
      url, 
      { correo, membresia, newPassword },
      { headers }
    );
  }
  

  getClientInfo(correo: string, membresia: string): Observable<any> {
    const params = { correo, membresia };
    return this.http.get<any>(`${this.apiUrl}/users/client`, { params });
  }

  // Métodos para manejar el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}
