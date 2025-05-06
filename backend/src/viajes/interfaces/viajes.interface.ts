export interface VueloSegmento {
    fecha_salida: string;
    hora_salida: string;
    hora_llegada: string;
    precio: number;
    aerolinea: string;
    plazas_disponibles: number;
}

export interface vuelosDto {
    _id: string;
    origen: string;
    destino: string;
    descripcion: string;
    ida: VueloSegmento;
    vuelta: VueloSegmento;
}

export interface usuariosDto {
    _id: string;
    nombre: string;
    email: string;
    contrasena_hash: string;
    telefono?: string;
    rol: string;
    fecha_registro: string;
}

export interface reservasDto {
    _id: string;
    usuario_id: string;
    vuelo_id: string;
    fecha_reserva: string;
    estado: string;
    asiento: string;
}

export interface pagosDto {
    _id: string;
    reserva_id: string;
    monto: number;
    metodo_pago: string;
    estado_pago: string;
    fecha_pago: string;
}

export interface opinionesDto {
    _id: string;
    usuario_id: string;
    vuelo_id: string;
    comentario: string;
    puntuacion: number;
    fecha: string;
}
