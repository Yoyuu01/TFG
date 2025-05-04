import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Opinion {
  _id: string;
  usuario_id: string;
  vuelo_id: string;
  puntuacion: number;
  comentario: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {
  constructor(private http: HttpClient) {}

  getOpiniones(): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(`${environment.apiUrl}/opiniones`);
  }

  getOpinion(id: string): Observable<Opinion> {
    return this.http.get<Opinion>(`${environment.apiUrl}/opiniones/${id}`);
  }

  getOpinionesPorVuelo(idVuelo: string): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(`${environment.apiUrl}/opiniones/vuelo/${idVuelo}`);
  }

  getOpinionesPorUsuario(idUsuario: string): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(`${environment.apiUrl}/opiniones/usuario/${idUsuario}`);
  }
}