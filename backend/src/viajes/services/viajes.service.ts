import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { vuelosDto, usuariosDto, reservasDto, pagosDto, opinionesDto } from "../../viajes/interfaces/viajes.interface";

@Injectable()
export class ViajesService {
    constructor(
        @InjectModel('Vuelo') private vueloModel: Model<vuelosDto>,
        @InjectModel('Usuario') private usuarioModel: Model<usuariosDto>,
        @InjectModel('Reserva') private reservaModel: Model<reservasDto>,
        @InjectModel('Pago') private pagoModel: Model<pagosDto>,
        @InjectModel('Opinion') private opinionModel: Model<opinionesDto>
    ) {}

    // Métodos para Vuelos
    async addVuelo(vueloDto: vuelosDto): Promise<vuelosDto> {
        const vuelo = new this.vueloModel(vueloDto);
        return vuelo.save();
    }

    async getVuelos(): Promise<vuelosDto[]> {
        return this.vueloModel.find().exec();
    }

    async getVuelo(idVuelo: string): Promise<vuelosDto | null> {
        return this.vueloModel.findById(idVuelo).exec();
    }

    async getVueloByOrigen(origen: string): Promise<vuelosDto[]> {
        const regex = new RegExp(origen, 'i');
        return this.vueloModel.find({ origen: { $regex: regex } }).exec();
    }

    async updateVuelo(id: string, vueloDto: vuelosDto): Promise<any> {
        return this.vueloModel.findByIdAndUpdate(
            vueloDto._id,
            { $set: vueloDto },
            { new: true }
        ).exec();
    }

    async deleteVuelo(idVuelo: string): Promise<vuelosDto | null> {
        return this.vueloModel.findByIdAndDelete(idVuelo).exec();
    }

    // Métodos para Usuarios
    async addUsuario(usuarioDto: usuariosDto): Promise<usuariosDto> {
        const usuario = new this.usuarioModel(usuarioDto);
        return usuario.save();
    }

    async getUsuarios(): Promise<usuariosDto[]> {
        return this.usuarioModel.find().exec();
    }

    async getUsuario(idUsuario: string): Promise<usuariosDto | null> {
        return this.usuarioModel.findById(idUsuario).exec();
    }

    async updateUsuario(id: string, usuarioDto: usuariosDto): Promise<any> {
        return this.usuarioModel.findByIdAndUpdate(
            usuarioDto._id,
            { $set: usuarioDto },
            { new: true }
        ).exec();
    }

    async deleteUsuario(idUsuario: string): Promise<usuariosDto | null> {
        return this.usuarioModel.findByIdAndDelete(idUsuario).exec();
    }

    // Métodos para Reservas
    async addReserva(reservaDto: reservasDto): Promise<reservasDto> {
        const reserva = new this.reservaModel(reservaDto);
        return reserva.save();
    }

    async getReservas(): Promise<reservasDto[]> {
        return this.reservaModel.find().exec();
    }

    async getReserva(idReserva: string): Promise<reservasDto | null> {
        return this.reservaModel.findById(idReserva).exec();
    }

    async getReservasByUsuario(idUsuario: string): Promise<reservasDto[]> {
        return this.reservaModel.find({ usuario_id: idUsuario }).exec();
    }

    async updateReserva(id: string, reservaDto: reservasDto): Promise<any> {
        return this.reservaModel.findByIdAndUpdate(
            reservaDto._id,
            { $set: reservaDto },
            { new: true }
        ).exec();
    }

    async deleteReserva(idReserva: string): Promise<reservasDto | null> {
        return this.reservaModel.findByIdAndDelete(idReserva).exec();
    }

    // Métodos para Pagos
    async addPago(pagoDto: pagosDto): Promise<pagosDto> {
        const pago = new this.pagoModel(pagoDto);
        return pago.save();
    }

    async getPagos(): Promise<pagosDto[]> {
        return this.pagoModel.find().exec();
    }

    async getPago(idPago: string): Promise<pagosDto | null> {
        return this.pagoModel.findById(idPago).exec();
    }

    async getPagosByReserva(idReserva: string): Promise<pagosDto[]> {
        return this.pagoModel.find({ reserva_id: idReserva }).exec();
    }

    async updatePago(id: string, pagoDto: pagosDto): Promise<any> {
        return this.pagoModel.findByIdAndUpdate(
            pagoDto._id,
            { $set: pagoDto },
            { new: true }
        ).exec();
    }

    async deletePago(idPago: string): Promise<pagosDto | null> {
        return this.pagoModel.findByIdAndDelete(idPago).exec();
    }

    // Métodos para Opiniones
    async addOpinion(opinionDto: opinionesDto): Promise<opinionesDto> {
        const opinion = new this.opinionModel(opinionDto);
        return opinion.save();
    }

    async getOpiniones(): Promise<opinionesDto[]> {
        return this.opinionModel.find().exec();
    }

    async getOpinion(idOpinion: string): Promise<opinionesDto | null> {
        return this.opinionModel.findById(idOpinion).exec();
    }

    async getOpinionesByVuelo(idVuelo: string): Promise<opinionesDto[]> {
        return this.opinionModel.find({ vuelo_id: idVuelo }).exec();
    }

    async getOpinionesByUsuario(idUsuario: string): Promise<opinionesDto[]> {
        return this.opinionModel.find({ usuario_id: idUsuario }).exec();
    }

    async updateOpinion(id: string, opinionDto: opinionesDto): Promise<any> {
        return this.opinionModel.findByIdAndUpdate(
            opinionDto._id,
            { $set: opinionDto },
            { new: true }
        ).exec();
    }

    async deleteOpinion(idOpinion: string): Promise<opinionesDto | null> {
        return this.opinionModel.findByIdAndDelete(idOpinion).exec();
    }

    // Métodos de búsqueda
    async searchVuelos(query: string): Promise<vuelosDto[]> {
        const regex = new RegExp(query, 'i');
        return this.vueloModel.find({
            $or: [
                { origen: { $regex: regex } },
                { destino: { $regex: regex } },
                { aerolinea: { $regex: regex } }
            ]
        }).exec();
    }

    // Método para obtener aerolíneas
    async getAerolineas(): Promise<{ status: string; data: string[] }> {
        const vuelos = await this.vueloModel.find().exec();
        const aerolineasSet = new Set<string>();
        
        vuelos.forEach(vuelo => {
            aerolineasSet.add(vuelo.aerolinea);
        });
        
        const aerolineas = Array.from(aerolineasSet);

        console.log('Aerolíneas encontradas:', aerolineas);

        return {
            status: 'OK',
            data: aerolineas
        };
    }
}