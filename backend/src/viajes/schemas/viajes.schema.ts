import { Schema } from "mongoose";

export const VuelosSchema = new Schema({
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    fecha_salida: { type: String, required: true },
    hora_salida: { type: String, required: true },
    hora_llegada: { type: String, required: true },
    precio: { type: Number, required: true },
    aerolinea: { type: String, required: true },
    plazas_disponibles: { type: Number, required: true }
}, { versionKey: false });

export const UsuariosSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono: { type: String, required: false },
    direccion: { type: String, required: false }
}, { versionKey: false });

export const ReservasSchema = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    vuelo_id: { type: Schema.Types.ObjectId, ref: 'Vuelo', required: true },
    fecha_reserva: { type: String, required: true },
    estado: { type: String, required: true },
    asiento: { type: String, required: true }
}, { versionKey: false });

export const PagosSchema = new Schema({
    reserva_id: { type: Schema.Types.ObjectId, ref: 'Reserva', required: true },
    monto: { type: Number, required: true },
    metodo_pago: { type: String, required: true },
    estado_pago: { type: String, required: true },
    fecha_pago: { type: String, required: true }
}, { versionKey: false });

export const OpinionesSchema = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    vuelo_id: { type: Schema.Types.ObjectId, ref: 'Vuelo', required: true },
    comentario: { type: String, required: true },
    puntuacion: { type: Number, required: true },
    fecha: { type: String, required: true }
}, { versionKey: false });