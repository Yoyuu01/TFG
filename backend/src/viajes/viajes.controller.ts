import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Query
} from '@nestjs/common';
import { ViajesService } from "./services/viajes.service";
import { vuelosDto } from "./interfaces/vuelos-dto.interface";
import { usuariosDto } from "./interfaces/usuarios-dto.interface";
import { reservasDto } from "./interfaces/reservas-dto.interface";
import { pagosDto } from "./interfaces/pagos-dto.interface";
import { opinionesDto } from "./interfaces/opiniones-dto.interface";

@Controller('api/v1/viajes')
export class ViajesController {

    constructor(private readonly viajesService: ViajesService) {
    }

    // Endpoints para Vuelos
    @Post('vuelos')
    async addVuelo(@Body() vueloDto: vuelosDto) {
        try {
            const resp = await this.viajesService.addVuelo(vueloDto);
            return {
                status: 'OK',
                message: 'Vuelo añadido correctamente',
            }
        } catch (e: any) {
            throw new BadRequestException(
                {
                    status: 'error',
                    message: e.message,
                })
        }
    }

    @Get('vuelos')
    async getVuelos() {
        try {
            const vuelos = await this.viajesService.getVuelos();
            return {
                status: 'OK',
                data: vuelos
            }
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('vuelos/:id')
    async getVuelo(@Param('id') id: string) {
        try {
            const data = await this.viajesService.getVuelo(id);
            if (data) {
                return {
                    status: 'OK',
                    data
                }
            }
            return new NotFoundException({
                status: 'error',
                message: 'Vuelo no encontrado',
            })
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('vuelos/origen/:origen')
    async getVueloByOrigen(@Param('origen') origen: string) {
        try {
            const data = await this.viajesService.getVueloByOrigen(origen);
            return {
                status: 'OK',
                data
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Put('vuelos/:id')
    async updateVuelo(@Param('id') id: string, @Body() vueloDto: vuelosDto) {
        try {
            const updateVuelo = await this.viajesService.updateVuelo(id, vueloDto);
            if (!updateVuelo) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Vuelo no encontrado',
                })
            }
            return {
                status: 'OK',
                message: 'Vuelo actualizado correctamente',
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Delete('vuelos/:id')
    async deleteVuelo(@Param('id') id: string) {
        try {
            const deleteVuelo = await this.viajesService.deleteVuelo(id);
            if (!deleteVuelo) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Vuelo no encontrado'
                })
            }
            return {
                status: 'OK',
                message: 'Vuelo eliminado'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    // Endpoints para Usuarios
    @Post('usuarios')
    async addUsuario(@Body() usuarioDto: usuariosDto) {
        try {
            const resp = await this.viajesService.addUsuario(usuarioDto);
            return {
                status: 'OK',
                message: 'Usuario añadido correctamente',
            }
        } catch (e: any) {
            throw new BadRequestException(
                {
                    status: 'error',
                    message: e.message,
                })
        }
    }

    @Get('usuarios')
    async getUsuarios() {
        try {
            const usuarios = await this.viajesService.getUsuarios();
            return {
                status: 'OK',
                data: usuarios
            }
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('usuarios/:id')
    async getUsuario(@Param('id') id: string) {
        try {
            const data = await this.viajesService.getUsuario(id);
            if (data) {
                return {
                    status: 'OK',
                    data
                }
            }
            return new NotFoundException({
                status: 'error',
                message: 'Usuario no encontrado',
            })
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Put('usuarios/:id')
    async updateUsuario(@Param('id') id: string, @Body() usuarioDto: usuariosDto) {
        try {
            const updateUsuario = await this.viajesService.updateUsuario(id, usuarioDto);
            if (!updateUsuario) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Usuario no encontrado',
                })
            }
            return {
                status: 'OK',
                message: 'Usuario actualizado correctamente',
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Delete('usuarios/:id')
    async deleteUsuario(@Param('id') id: string) {
        try {
            const deleteUsuario = await this.viajesService.deleteUsuario(id);
            if (!deleteUsuario) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Usuario no encontrado'
                })
            }
            return {
                status: 'OK',
                message: 'Usuario eliminado'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    // Endpoints para Reservas
    @Post('reservas')
    async addReserva(@Body() reservaDto: reservasDto) {
        try {
            const resp = await this.viajesService.addReserva(reservaDto);
            return {
                status: 'OK',
                message: 'Reserva añadida correctamente',
            }
        } catch (e: any) {
            throw new BadRequestException(
                {
                    status: 'error',
                    message: e.message,
                })
        }
    }

    @Get('reservas')
    async getReservas() {
        try {
            const reservas = await this.viajesService.getReservas();
            return {
                status: 'OK',
                data: reservas
            }
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('reservas/:id')
    async getReserva(@Param('id') id: string) {
        try {
            const data = await this.viajesService.getReserva(id);
            if (data) {
                return {
                    status: 'OK',
                    data
                }
            }
            return new NotFoundException({
                status: 'error',
                message: 'Reserva no encontrada',
            })
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('reservas/usuario/:idUsuario')
    async getReservasByUsuario(@Param('idUsuario') idUsuario: string) {
        try {
            const data = await this.viajesService.getReservasByUsuario(idUsuario);
            return {
                status: 'OK',
                data
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Put('reservas/:id')
    async updateReserva(@Param('id') id: string, @Body() reservaDto: reservasDto) {
        try {
            const updateReserva = await this.viajesService.updateReserva(id, reservaDto);
            if (!updateReserva) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Reserva no encontrada',
                })
            }
            return {
                status: 'OK',
                message: 'Reserva actualizada correctamente',
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Delete('reservas/:id')
    async deleteReserva(@Param('id') id: string) {
        try {
            const deleteReserva = await this.viajesService.deleteReserva(id);
            if (!deleteReserva) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Reserva no encontrada'
                })
            }
            return {
                status: 'OK',
                message: 'Reserva eliminada'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    // Endpoints para Pagos
    @Post('pagos')
    async addPago(@Body() pagoDto: pagosDto) {
        try {
            const resp = await this.viajesService.addPago(pagoDto);
            return {
                status: 'OK',
                message: 'Pago añadido correctamente',
            }
        } catch (e: any) {
            throw new BadRequestException(
                {
                    status: 'error',
                    message: e.message,
                })
        }
    }

    @Get('pagos')
    async getPagos() {
        try {
            const pagos = await this.viajesService.getPagos();
            return {
                status: 'OK',
                data: pagos
            }
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('pagos/:id')
    async getPago(@Param('id') id: string) {
        try {
            const data = await this.viajesService.getPago(id);
            if (data) {
                return {
                    status: 'OK',
                    data
                }
            }
            return new NotFoundException({
                status: 'error',
                message: 'Pago no encontrado',
            })
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('pagos/reserva/:idReserva')
    async getPagosByReserva(@Param('idReserva') idReserva: string) {
        try {
            const data = await this.viajesService.getPagosByReserva(idReserva);
            return {
                status: 'OK',
                data
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Put('pagos/:id')
    async updatePago(@Param('id') id: string, @Body() pagoDto: pagosDto) {
        try {
            const updatePago = await this.viajesService.updatePago(id, pagoDto);
            if (!updatePago) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Pago no encontrado',
                })
            }
            return {
                status: 'OK',
                message: 'Pago actualizado correctamente',
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Delete('pagos/:id')
    async deletePago(@Param('id') id: string) {
        try {
            const deletePago = await this.viajesService.deletePago(id);
            if (!deletePago) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Pago no encontrado'
                })
            }
            return {
                status: 'OK',
                message: 'Pago eliminado'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    // Endpoints para Opiniones
    @Post('opiniones')
    async addOpinion(@Body() opinionDto: opinionesDto) {
        try {
            const resp = await this.viajesService.addOpinion(opinionDto);
            return {
                status: 'OK',
                message: 'Opinión añadida correctamente',
            }
        } catch (e: any) {
            throw new BadRequestException(
                {
                    status: 'error',
                    message: e.message,
                })
        }
    }

    @Get('opiniones')
    async getOpiniones() {
        try {
            const opiniones = await this.viajesService.getOpiniones();
            return {
                status: 'OK',
                data: opiniones
            }
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('opiniones/:id')
    async getOpinion(@Param('id') id: string) {
        try {
            const data = await this.viajesService.getOpinion(id);
            if (data) {
                return {
                    status: 'OK',
                    data
                }
            }
            return new NotFoundException({
                status: 'error',
                message: 'Opinión no encontrada',
            })
        } catch (e: any) {
            return new BadRequestException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('opiniones/vuelo/:idVuelo')
    async getOpinionesByVuelo(@Param('idVuelo') idVuelo: string) {
        try {
            const data = await this.viajesService.getOpinionesByVuelo(idVuelo);
            return {
                status: 'OK',
                data
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Get('opiniones/usuario/:idUsuario')
    async getOpinionesByUsuario(@Param('idUsuario') idUsuario: string) {
        try {
            const data = await this.viajesService.getOpinionesByUsuario(idUsuario);
            return {
                status: 'OK',
                data
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Put('opiniones/:id')
    async updateOpinion(@Param('id') id: string, @Body() opinionDto: opinionesDto) {
        try {
            const updateOpinion = await this.viajesService.updateOpinion(id, opinionDto);
            if (!updateOpinion) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Opinión no encontrada',
                })
            }
            return {
                status: 'OK',
                message: 'Opinión actualizada correctamente',
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    @Delete('opiniones/:id')
    async deleteOpinion(@Param('id') id: string) {
        try {
            const deleteOpinion = await this.viajesService.deleteOpinion(id);
            if (!deleteOpinion) {
                throw new NotFoundException({
                    status: 'error',
                    message: 'Opinión no encontrada'
                })
            }
            return {
                status: 'OK',
                message: 'Opinión eliminada'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            })
        }
    }

    // Endpoints de búsqueda
    @Get('search')
    async searchVuelos(@Query('query') query: string) {
        try {
            const vuelos = await this.viajesService.searchVuelos(query);
            return {
                status: 'OK',
                data: vuelos
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            });
        }
    }

    @Get('aerolineas')
    async getAerolineas() {
        try {
            const aerolineas = await this.viajesService.getAerolineas();
            console.log('Aerolíneas en el controlador:', aerolineas);
            return aerolineas;
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'error',
                message: e.message,
            });
        }
    }


@Post('usuarios/login')
    async loginUsuario(@Body() credenciales: { email: string, contrasena_hash: string }) {
     try {
            const usuario = await this.viajesService.verificarUsuario(credenciales);
         return {
             status: 'OK',
             data: usuario
         };
        } catch (e: any) {
            return new BadRequestException({
             status: 'error',
             message: e.message,
            });
        }
    }
}