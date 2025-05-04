import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonButtons,
    IonIcon
  ]
})
export class RegisterPage implements OnInit {
  nombre: string = '';
  email: string = '';
  contraseña: string = '';
  confirmarContraseña: string = '';
  telefono: string = '';
  
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  registrarUsuario() {
    if (this.contraseña !== this.confirmarContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const usuario = {
      nombre: this.nombre,
      email: this.email,
      contraseña_hash: this.contraseña,
      telefono: this.telefono,
      rol: this.rol,
      fecha_registro: new Date().toISOString()
    };

    this.http.post('http://localhost:3000/api/v1/viajes/usuarios', usuario)
      .subscribe({
        next: (res) => {
          alert('Usuario registrado correctamente');
          // Redirigir o limpiar formulario si es necesario
        },
        error: (err) => {
          alert('Error al registrar usuario: ' + (err.error?.message || err.message));
        }
      });
  }
}