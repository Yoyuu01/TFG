import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon
  ]
})
export class HeaderComponent {}