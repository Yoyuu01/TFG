import { Schema } from "mongoose";

export const TarjetaSchema = new Schema({
    nombre: { type: String, required: true },
    numero: { type: String, required: true },
    caducidad: { type: String, required: true },
    cvv: { type: String, required: true }
}, { versionKey: false });