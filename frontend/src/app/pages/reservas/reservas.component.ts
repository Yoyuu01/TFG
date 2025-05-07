import { Component } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../componentes/header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    HeaderComponent
  ]
})
export class ReservasComponent {
  reserva = {
    usuario_id: '',
    vuelo_id: '',
    vuelo_nombre: '',
    fecha_reserva: '',
    estado: 'pago pendiente',
    asiento: ''
  };

  constructor(
    private reservasService: ReservasService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['vuelo_id']) {
        this.reserva.vuelo_id = params['vuelo_id'];
      }
      if (params['vuelo_nombre']) {
        this.reserva.vuelo_nombre = params['vuelo_nombre'];
      }
    });
  }

  crearReserva() {
    const reservaData = { ...this.reserva };
const { vuelo_nombre, ...reservaDataWithoutNombre } = reservaData;
const finalReservaData = reservaDataWithoutNombre;
    this.reservasService.crearReserva(reservaData).subscribe({
      next: (res) => {
        alert('Reserva creada correctamente');
      },
      error: (err) => {
        alert('Error al crear la reserva');
      }
    });
  }
}