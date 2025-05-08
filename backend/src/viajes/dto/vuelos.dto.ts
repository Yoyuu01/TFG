import { VueloSegmentoDto } from "./vuelo-segmento.dto";

export class vuelosDto {
    _id: string;
    origen: string;
    destino: string;
    descripcion: string;
    ida: VueloSegmentoDto;
    vuelta: VueloSegmentoDto;
}