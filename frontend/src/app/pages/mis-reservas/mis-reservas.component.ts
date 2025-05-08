import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss'],
  standalone: true
})
export class MisReservasComponent implements OnInit {
  reservas: any[] = [];
  usuario: any = null;

  constructor(private reservasService: ReservasService) {}

  ngOnInit() {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
      this.reservasService.getReservasPorUsuario(this.usuario.nombre || this.usuario.email)
        .subscribe(res => this.reservas = res);
    }
  }
}