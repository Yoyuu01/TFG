export class vuelosDto {
    _id: string;
    origen: string;
    destino: string;
    fecha_salida: string;
    hora_salida: string;
    hora_llegada: string;
    precio: number;
    aerolinea: string;
    plazas_disponibles: number;
}

export class usuariosDto {
    _id: string;
    nombre: string;
    email: string;
    contrasena_hash: string;
    telefono?: string;
    rol: string;
    fecha_registro: string;
}

export class reservasDto {
    _id: string;
    usuario_id: string;
    vuelo_id: string;
    fecha_reserva: string;
    estado: string;
    asiento: string;
}

export class pagosDto {
    _id: string;
    reserva_id: string;
    monto: number;
    metodo_pago: string;
    estado_pago: string;
    fecha_pago: string;
}

export class opinionesDto {
    _id: string;
    usuario_id: string;
    vuelo_id: string;
    comentario: string;
    puntuacion: number;
    fecha: string;
}

