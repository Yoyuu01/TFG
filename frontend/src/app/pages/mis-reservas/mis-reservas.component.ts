import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MisReservasComponent implements OnInit {
  reservas: any[] = [];
  usuario: any = null;

  constructor(private reservasService: ReservasService) {}

  ngOnInit() {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
      // Aquí deberías usar this.usuario._id si el backend espera el ID
      this.reservasService.getReservasPorUsuario(this.usuario._id)
        .subscribe(res => this.reservas = res);
    }
  }
}