import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  contrasena: string = '';
  confirmarContrasena: string = '';
  telefono: string = '';
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  registrarUsuario() {
    if (!this.nombre || !this.email || !this.contrasena || !this.confirmarContrasena || !this.telefono) {
      alert('Por favor, rellena todos los campos');
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const usuario = {
      nombre: this.nombre,
      email: this.email,
      contrasena_hash: this.contrasena,
      telefono: this.telefono,
      rol: 'cliente',
      fecha_registro: new Date().toISOString()
    };

    this.http.post('http://localhost:3000/api/v1/viajes/usuarios', usuario)
      .subscribe({
        next: (res) => {
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error completo:', err);
          alert('Error al registrar usuario: ' + (err.error?.message || err.message));
        }
      });
  }
}