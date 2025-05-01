export interface ApiResponseViajes {
  status: string;
  data: Viaje[];
}

export interface ApiResponseViaje {
  status: string;
  data: Viaje;
}

export interface ApiResponseMessage {
  status: string;
  message: string;
}

export interface Viaje {
  _id: string;
  origen: string;
  destino: string;
  fecha_salida: string;
  hora_salida: string;
  hora_llegada: string;
  precio: number;
  aerolinea: string;
  plazas_disponibles: number;
  rating?: number;
  opiniones?: Opinion[];
}

export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
}

export interface Reserva {
  _id: string;
  usuario_id: string;
  vuelo_id: string;
  fecha_reserva: string;
  estado: string;
  asiento: string;
}

export interface Pago {
  _id: string;
  reserva_id: string;
  monto: number;
  metodo_pago: string;
  estado_pago: string;
  fecha_pago: string;
}

export interface Opinion {
  _id: string;
  usuario_id: string;
  vuelo_id: string;
  comentario: string;
  puntuacion: number;
  fecha: string;
}