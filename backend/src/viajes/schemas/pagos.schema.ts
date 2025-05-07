import { Schema } from "mongoose";

export const PagosSchema = new Schema({
    reserva_id: { type: Schema.Types.ObjectId, ref: 'Reserva', required: true },
    monto: { type: Number, required: true },
    metodo_pago: { type: String, required: true },
    estado_pago: { type: String, required: true },
    fecha_pago: { type: String, required: true }
}, { versionKey: false });