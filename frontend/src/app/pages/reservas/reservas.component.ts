import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IonContent, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../componentes/header/header.component';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    FormsModule,
    HeaderComponent
  ]
})
export class ReservasComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';

  constructor(private location: Location) {}

  confirmarReserva() {
    // Aquí iría la lógica para confirmar la reserva
    alert('¡Reserva confirmada!');
  }

  volver() {
    this.location.back();
  }
}