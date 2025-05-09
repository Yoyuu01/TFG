
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = 'http://localhost:3000/api/v1/viajes';

  constructor(private http: HttpClient) {}

  existeAsiento(asiento: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/reservas/existe-asiento/${asiento}`);
  }

  crearReserva(reserva: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservas`, reserva);
  }

  getReservasPorUsuario(usuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservas/usuario/${usuario}`);
  }
}
