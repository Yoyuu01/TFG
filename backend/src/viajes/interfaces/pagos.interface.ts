export interface pagosInterface {
    _id: string;
    monto: number;
    metodo_pago: string;
    estado_pago: string;
    fecha_pago: string;
    nombre_titular: string; // Nuevo campo
    numero_tarjeta: string; // Nuevo campo
    caducidad_tarjeta: string; // Nuevo campo
    cvv_tarjeta: string; // Nuevo campo
}