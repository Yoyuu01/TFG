import { Component } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonAvatar } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonAvatar
  ],
})
export class MenuComponent {
  usuario: any = null;

  constructor() {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }
}