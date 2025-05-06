import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonButton, 
  IonItem, 
  IonLabel, 
  IonList
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  logInOutline, 
  personAddOutline, 
  airplaneOutline, 
  walletOutline, 
  shieldCheckmarkOutline,
  arrowBackOutline
} from 'ionicons/icons';
import { HeaderComponent } from '../../componentes/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    HeaderComponent
  ]
})
export class LoginPage {
  email: string = '';
  contrasena: string = '';

  constructor(private http: HttpClient, private router: Router) {
    addIcons({ 
      'log-in-outline': logInOutline,
      'person-add-outline': personAddOutline,
      'airplane-outline': airplaneOutline,
      'wallet-outline': walletOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'arrow-back-outline': arrowBackOutline
    });
  }

  entrar() {
    const credenciales = {
      email: this.email,
      contrasena_hash: this.contrasena
    };

    this.http.post('http://localhost:3000/api/v1/viajes/usuarios/login', credenciales)
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            localStorage.setItem('usuario', JSON.stringify(res.data));
            alert('Bienvenido, ' + (res.data.nombre || 'usuario') + '!');
            this.router.navigate(['/inicio']);
          } else {
            alert('Usuario o contraseña incorrectos');
          }
        },
        error: (err) => {
          console.error('Error completo:', err);
          alert('Error al iniciar sesión: ' + (err.error?.message || err.message));
        }
      });
  }
}