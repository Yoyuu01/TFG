import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}

  onMenuOpen() {
    setTimeout(() => {
      const firstMenuButton = document.querySelector('ion-menu ion-item, ion-menu button');
      if (firstMenuButton) (firstMenuButton as HTMLElement).focus();
    }, 100);
  }

  onMenuClose() {
    setTimeout(() => {
      const mainButton = document.querySelector('.ver-vuelo-btn');
      if (mainButton) (mainButton as HTMLElement).focus();
    }, 100);
  }
}
