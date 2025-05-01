import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Vuelo {
  _id: string;
  origen: string;
  destino: string;
  fecha_salida: string;
  hora_salida: string;
  hora_llegada: string;
  precio: number;
  aerolinea: string;
  plazas_disponibles: number;
}

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  constructor(private http: HttpClient) {}

  getVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${environment.apiUrl}/vuelos`);
  }

  getVuelo(id: string): Observable<Vuelo> {
    return this.http.get<Vuelo>(`${environment.apiUrl}/vuelos/${id}`);
  }

  getVuelosPorOrigen(origen: string): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${environment.apiUrl}/vuelos/origen/${origen}`);
  }

  buscarVuelos(query: string): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${environment.apiUrl}/vuelos/search?query=${query}`);
  }

  getAerolineas(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/aerolineas`);
  }
}