import { VueloSegmento } from "./vuelo-segmento.interface";

export interface vuelosDto {
    _id: string;
    origen: string;
    destino: string;
    descripcion: string;
    ida: VueloSegmento;
    vuelta: VueloSegmento;
}