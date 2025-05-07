import { Schema } from "mongoose";

export const UsuariosSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasena_hash: { type: String, required: true },
    telefono: { type: String, required: false },
    rol: { type: String, required: true },
    fecha_registro: { type: String, required: true }
}, { versionKey: false });