import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Usuario {
  _id: string;
  nombre: string;
  // Puedes añadir más campos si tu backend los devuelve, por ejemplo: email, etc.
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = environment.apiUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<{ data: Usuario[] }> {
    return this.http.get<{ data: Usuario[] }>(this.apiUrl);
  }
}