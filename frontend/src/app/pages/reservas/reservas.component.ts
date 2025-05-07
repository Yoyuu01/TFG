import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas.service';
import { ViajesService, Vuelo } from 'src/app/services/viajes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../componentes/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
export class ReservasComponent implements OnInit {
  reserva = {
    nombre: '',
    vuelo_id: '',
    vuelo_nombre: '',
    fecha_reserva: '',
    estado: 'pago pendiente',
    asiento: ''
  };
  vuelos: Vuelo[] = [];
  mensaje: string = '';
  usuarioLogueado: boolean = false;

  constructor(
    private reservasService: ReservasService,
    private viajesService: ViajesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el vuelo_id de los parámetros de la ruta (query params)
    this.route.queryParams.subscribe(params => {
      if (params['vuelo_id']) {
        this.reserva.vuelo_id = params['vuelo_id'];
      }
    });

    this.viajesService.getVuelos().subscribe({
      next: (res: any) => {
        this.vuelos = res.data ? res.data : res;
        // Si ya tenemos vuelo_id, autoseleccionamos la aerolínea
        if (this.reserva.vuelo_id) {
          this.actualizarNombreVuelo();
        }
      }
    });
    // Mantener el asiento aunque se recargue la página
    const asientoGuardado = localStorage.getItem('asiento_reserva');
    if (asientoGuardado) {
      this.reserva.asiento = asientoGuardado;
    } else {
      this.reserva.asiento = this.generarAsientoAleatorio();
      localStorage.setItem('asiento_reserva', this.reserva.asiento);
    }
  }

  generarAsientoAleatorio(): string {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
    const num = Math.floor(Math.random() * 99) + 1; // 1 a 99
    const letra = letras[Math.floor(Math.random() * letras.length)];
    return `${num}${letra}`;
  }

  actualizarNombreVuelo() {
    const vuelo = this.vuelos.find(v => v._id === this.reserva.vuelo_id);
    this.reserva.vuelo_nombre = vuelo ? vuelo.ida.aerolinea : '';
    // No cambiar el asiento aquí para mantenerlo fijo hasta que el usuario pulse "Volver"
  }

  async volverAtras() {
    // Al volver, generar un nuevo asiento que no esté en la base de datos
    const nuevoAsiento = await this.obtenerAsientoUnico();
    localStorage.setItem('asiento_reserva', nuevoAsiento);
    this.reserva.asiento = nuevoAsiento;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  async obtenerAsientoUnico(): Promise<string> {
    let asiento: string;
    let existe = true;
    do {
      asiento = this.generarAsientoAleatorio();
      // Espera a que el observable se resuelva correctamente
      existe = await this.reservasService.existeAsiento(asiento).toPromise().then(res => !!res).catch(() => false);
    } while (existe);
    return asiento;
  }

  crearReserva() {
    // Comprobar si es la primera reserva del usuario
    this.reservasService.getReservasPorUsuario(this.reserva.nombre).subscribe({
      next: (reservas) => {
        if (reservas.length === 0) {
          // Es la primera reserva
          this.mensaje = '¡Felicidades! Esta es tu primera reserva.';
        }
        const reservaData = { ...this.reserva };
        const { vuelo_nombre, ...reservaDataWithoutNombre } = reservaData;
        this.reservasService.crearReserva(reservaDataWithoutNombre).subscribe({
          next: () => {
            this.mensaje += '\n¡Reserva creada correctamente!';
            // Limpiar el asiento guardado solo si la reserva fue exitosa
            localStorage.removeItem('asiento_reserva');
          },
          error: () => {
            this.mensaje = 'Error al crear la reserva. Inténtalo de nuevo.';
          }
        });
      },
      error: () => {
        this.mensaje = 'Error al comprobar reservas previas.';
      }
    });
  }

  getVueloDisplay(): string {
    const vuelo = this.vuelos.find(v => v._id === this.reserva.vuelo_id);
    return vuelo ? `${vuelo.ida.aerolinea} (${vuelo.origen} → ${vuelo.destino})` : '';
  }
}