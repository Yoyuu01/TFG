import { Component } from '@angular/core';
import { IonContent, IonInput, IonButton, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../componentes/header/header.component';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    HeaderComponent
  ]
})
export class PagoPage {
  reserva_id: string = '';
  monto: number = 0;
  metodo_pago: string = '';
  estado_pago: string = 'pendiente';
  fecha_pago: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  realizarPago() {
    if (!this.reserva_id || !this.monto || !this.metodo_pago) {
      this.mensaje = 'Por favor, rellena todos los campos obligatorios.';
      return;
    }
    const pago = {
      reserva_id: this.reserva_id,
      monto: this.monto,
      metodo_pago: this.metodo_pago,
      estado_pago: this.estado_pago,
      fecha_pago: new Date().toISOString()
    };
    this.http.post('http://localhost:3000/api/v1/viajes/pagos', pago)
      .subscribe({
        next: (res: any) => {
          this.mensaje = '¡Pago realizado correctamente!';
          setTimeout(() => this.router.navigate(['/mis-reservas']), 1500);
        },
        error: (err) => {
          this.mensaje = 'Error al realizar el pago: ' + (err.error?.message || err.message);
        }
      });
  }
}