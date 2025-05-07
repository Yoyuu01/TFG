// ... existing code ...
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  constructor(private http: HttpClient) {}

  crearReserva(reserva: any) {
    return this.http.post('http://localhost:3000/reservas', reserva);
  }
}
// ... existing code ...