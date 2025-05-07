import { Schema } from "mongoose";

const VueloSegmentoSchema = new Schema({
    fecha_salida: { type: String, required: true },
    hora_salida: { type: String, required: true },
    hora_llegada: { type: String, required: true },
    precio: { type: Number, required: true },
    aerolinea: { type: String, required: true },
    plazas_disponibles: { type: Number, required: true }
}, { _id: false });

export const VuelosSchema = new Schema({
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    descripcion: { type: String, required: true },
    ida: { type: VueloSegmentoSchema, required: true },
    vuelta: { type: VueloSegmentoSchema, required: true }
}, { versionKey: false });