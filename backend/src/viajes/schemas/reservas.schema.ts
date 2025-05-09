import { Schema } from "mongoose";

export const ReservasSchema = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    vuelo_id: { type: Schema.Types.ObjectId, ref: 'Vuelo', required: true },
    fecha_reserva: { type: String, required: true },
    estado: { type: String, required: true },
    asiento: { type: String, required: true }
}, { versionKey: false });