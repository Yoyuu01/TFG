import { Component } from '@angular/core';
import { 
  IonContent, 
  IonIcon
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  logInOutline, 
  personAddOutline, 
  airplaneOutline, 
  walletOutline, 
  shieldCheckmarkOutline,
  arrowBackOutline
} from 'ionicons/icons';
import { ViajesService, Vuelo } from '../../services/viajes.service';
import { OpinionesService, Opinion } from '../../services/opiniones.service';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FormsModule } from '@angular/forms';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonIcon,
    HeaderComponent,
    FormsModule
  ]
})
export class InicioPage {
  vuelos: Vuelo[] = [];
  opiniones: Opinion[] = [];
  usuarios: Usuario[] = [];
  aerolineaSeleccionada: string = '';
  origenSeleccionado: string = '';
  destinoSeleccionado: string = '';
  origenesDisponibles: string[] = [];
  destinosDisponibles: string[] = [];
  vuelosVisibles: number = 6; // Número de vuelos que se muestran inicialmente

  get vuelosFiltrados(): Vuelo[] {
    return this.vuelos.filter(v =>
      (!this.aerolineaSeleccionada || v.ida.aerolinea === this.aerolineaSeleccionada) &&
      (!this.origenSeleccionado || v.origen === this.origenSeleccionado) &&
      (!this.destinoSeleccionado || v.destino === this.destinoSeleccionado)
    );
  }

  get vuelosParaMostrar(): Vuelo[] {
    return this.vuelosFiltrados.slice(0, this.vuelosVisibles);
  }

  cargarMasVuelos() {
    this.vuelosVisibles += 6; // Puedes ajustar el número según prefieras
  }
  get aerolineasDisponibles(): string[] {
    // Devuelve un array único de aerolíneas disponibles
    return [...new Set(this.vuelos.map(v => v.ida.aerolinea))];
  }
  opinionActual: number = 0;
  constructor(
    private viajesService: ViajesService,
    private opinionesService: OpinionesService,
    private usuariosService: UsuariosService
  ) {
    addIcons({ 
      'log-in-outline': logInOutline,
      'person-add-outline': personAddOutline,
      'airplane-outline': airplaneOutline,
      'wallet-outline': walletOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'arrow-back-outline': arrowBackOutline,
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline
    });
  }

  ngOnInit() {
    this.viajesService.getVuelos().subscribe({
      next: (res: any) => {
        if (res.data && res.data.length > 0) {
          this.vuelos = res.data;
          // Llenar los arrays de filtros únicos
          this.origenesDisponibles = [...new Set(this.vuelos.map(v => v.origen))];
          this.destinosDisponibles = [...new Set(this.vuelos.map(v => v.destino))];
        }
      },
      error: (err) => {
        console.error('Error al obtener los vuelos:', err);
      }
    });

    this.opinionesService.getOpiniones().subscribe({
      next: (res: any) => {
        if (res.data && res.data.length > 0) {
          this.opiniones = res.data;
        }
      },
      error: (err) => {
        console.error('Error al obtener las opiniones:', err);
      }
    });

    this.usuariosService.getUsuarios().subscribe({
      next: (res: any) => {
        if (res.data && res.data.length > 0) {
          this.usuarios = res.data;
        }
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      }
    });
  }

  getNombreUsuario(id: string): string {
    const usuario = this.usuarios.find(u => u._id === id);
    return usuario ? usuario.nombre : 'Usuario desconocido';
  }

  getEstrellas(puntuacion: number): number[] {
    return Array(5).fill(0).map((_, i) => i < puntuacion ? 1 : 0);
  }

  trackByOpinionId(index: number, opinion: Opinion): string {
    return opinion._id;
  }
}
