import { Schema } from "mongoose";

export const OpinionesSchema = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    vuelo_id: { type: Schema.Types.ObjectId, ref: 'Vuelo', required: true },
    comentario: { type: String, required: true },
    puntuacion: { type: Number, required: true },
    fecha: { type: String, required: true }
}, { versionKey: false });