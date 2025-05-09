import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { logInOutline, personAddOutline, airplaneOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    RouterModule
  ]
})
export class HeaderComponent {
  usuario: any = null;

  constructor(private router: Router) {
    this.actualizarUsuario();
    window.addEventListener('storage', () => this.actualizarUsuario());
    // Actualiza usuario cada vez que cambias de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarUsuario();
      }
    });
  }

  actualizarUsuario() {
    const usuarioStr = localStorage.getItem('usuario');
    this.usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.router.navigate(['/login']);
  }

  irAMisReservas() {
    this.router.navigate(['/mis-reservas']);
  }
}