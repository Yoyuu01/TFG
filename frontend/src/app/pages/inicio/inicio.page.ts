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
import { ViajesService, Vuelo } from 'src/app/services/viajes.service';
import { OpinionesService, Opinion } from 'src/app/services/opiniones.service';
import { UsuariosService,Usuario } from'src/app/services/usuarios.service';
import { HeaderComponent } from '../../componentes/header/header.component';

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
    HeaderComponent
  ]
})
export class InicioPage {
  vuelos: Vuelo[] = [];
  opiniones: Opinion[] = [];
  usuarios: Usuario[] = [];

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
      'arrow-back-outline': arrowBackOutline
    });
  }

  ngOnInit() {
    this.viajesService.getVuelos().subscribe({
      next: (res: any) => {
        if (res.data && res.data.length > 0) {
          this.vuelos = res.data;
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