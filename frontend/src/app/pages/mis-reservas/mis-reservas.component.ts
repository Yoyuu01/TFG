import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule], 
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
        .subscribe((res: any) => {
          // Si tu backend devuelve {status, data}, accede a data
          this.reservas = res.data ? res.data : res;
        });
    }
  }
}