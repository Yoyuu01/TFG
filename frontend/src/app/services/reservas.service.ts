
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getReservasPorUsuario(usuario_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservas/usuario/${usuario_id}`);
  }

  crearReserva(reserva: any) {
    return this.http.post(`${this.apiUrl}/reservas`, reserva);
  }

  existeAsiento(asiento: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/reservas/asiento/${asiento}`);
  }
}
