import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  _id: string;
  nombre: string;
  // Puedes añadir más campos si tu backend los devuelve, por ejemplo: email, etc.
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios'; // Cambia la URL si tu backend es diferente

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<{ data: Usuario[] }> {
    return this.http.get<{ data: Usuario[] }>(this.apiUrl);
  }
}