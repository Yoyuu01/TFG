export interface usuariosInterface {
    _id: string;
    nombre: string;
    email: string;
    contrasena_hash: string;
    telefono?: string;
    rol: string;
    fecha_registro: string;
}