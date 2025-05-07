import { Component } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../componentes/header/header.component';

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
    fecha_reserva: '',
    estado: '',
    asiento: ''
  };

  constructor(private reservasService: ReservasService) {}

  crearReserva() {
    this.reservasService.crearReserva(this.reserva).subscribe({
      next: (res) => {
        alert('Reserva creada correctamente');
      },
      error: (err) => {
        alert('Error al crear la reserva');
      }
    });
  }
}