import { Component } from '@angular/core';
import { IonContent, IonInput, IonButton, IonItem, IonLabel, IonList, IonIcon } from '@ionic/angular/standalone';
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
    IonContent,
    IonIcon,
    IonButton,
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

  // Añade estas propiedades para el formulario de tarjeta
  nombreTarjeta: string = '';
  numeroTarjeta: string = '';
  caducidadTarjeta: string = '';
  cvvTarjeta: string = '';

  usuario: any = null;
  vuelo: any = null;

  constructor(private http: HttpClient, private router: Router) {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      alert('Debes iniciar sesión para acceder a la página de pago.');
      this.router.navigate(['/login']);
      return;
    }
    this.usuario = JSON.parse(usuarioStr);

    // Obtener datos del vuelo desde queryParams
    const url = new URL(window.location.href);
    const vuelo_id = url.searchParams.get('vuelo_id');
    const vuelo_nombre = url.searchParams.get('vuelo_nombre');
    this.vuelo = { id: vuelo_id, nombre: vuelo_nombre };
    const reserva = {
      usuario_id: this.usuario.id,
      vuelo_id: this.vuelo.id,
      estado: 'reservado',
      fecha_reserva: new Date().toISOString()
    };
  }

  realizarPago() {
    // Validación de los campos de la tarjeta
    if (!this.nombreTarjeta || !this.numeroTarjeta || !this.caducidadTarjeta || !this.cvvTarjeta) {
      this.mensaje = 'Por favor, rellena todos los campos de la tarjeta.';
      return;
    }

    // Validación de datos de vuelo y usuario
    if (!this.vuelo?.id || !this.usuario?.id) {
      this.mensaje = 'Faltan datos del vuelo o del usuario.';
      return;
    }

    // 1. Crear la reserva
    const reserva = {
      usuario_id: this.usuario.id,
      vuelo_id: this.vuelo.id,
      estado: 'reservado',
      fecha_reserva: new Date().toISOString()
    };

    this.http.post('http://localhost:3000/api/v1/viajes/reservas', reserva)
      .subscribe({
        next: (resReserva: any) => {
          const reserva_id = resReserva.id || resReserva.reserva_id;
          const pago = {
            reserva_id: reserva_id,
            monto: 100,
            metodo_pago: 'tarjeta',
            estado_pago: 'pendiente',
            fecha_pago: new Date().toISOString(),
            nombre_titular: this.nombreTarjeta,
            numero_tarjeta: this.numeroTarjeta,
            caducidad_tarjeta: this.caducidadTarjeta,
            cvv_tarjeta: this.cvvTarjeta
          };
          this.http.post('http://localhost:3000/api/v1/viajes/pagos', pago)
            .subscribe({
              next: (resPago: any) => {
                this.mensaje = '¡Reserva y pago realizados correctamente!';
                setTimeout(() => this.router.navigate(['/mis-reservas']), 1500);
              },
              error: (err) => {
                this.mensaje = 'Error al realizar el pago: ' + (err.error?.message || err.message);
              }
            });
        },
        error: (err) => {
          this.mensaje = 'Error al crear la reserva: ' + (err.error?.message || err.message);
        }
      });
  }

  getNumeroTarjetaFormateado(): string {
    if (!this.numeroTarjeta) return '••••-••••-••••-••••';
    // Elimina espacios o guiones previos y agrupa en bloques de 4
    return this.numeroTarjeta.replace(/\D/g, '').replace(/(.{4})/g, '$1-').replace(/-$/, '');
  }

  onCaducidadInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    this.caducidadTarjeta = value;
  }

  onCVVInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    this.cvvTarjeta = value;
  }
}