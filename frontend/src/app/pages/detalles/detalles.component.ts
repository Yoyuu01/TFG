import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajesService, Vuelo } from 'src/app/services/viajes.service';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonIcon, 
  IonMenuButton,
  IonMenu,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  logInOutline, 
  personAddOutline, 
  airplaneOutline,
  arrowBackOutline,
  arrowForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonIcon,
    IonMenuButton,
    IonMenu,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class DetallesComponent implements OnInit {
  vuelo: Vuelo | null = null;

  constructor(
    private route: ActivatedRoute,
    private viajesService: ViajesService,
    private location: Location
  ) {
    addIcons({ 
      'log-in-outline': logInOutline,
      'person-add-outline': personAddOutline,
      'airplane-outline': airplaneOutline,
      'arrow-back-outline': arrowBackOutline,
      'arrow-forward-outline': arrowForwardOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.viajesService.getVuelo(id).subscribe({
        next: (res: any) => {
          this.vuelo = res.data ? res.data : res;
        }
      });
    }
  }

  volver() {
    this.location.back();
  }
}