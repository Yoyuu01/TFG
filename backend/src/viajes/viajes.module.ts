import { Module } from '@nestjs/common';
import { ViajesController } from './viajes.controller';
import { ViajesService } from './services/viajes.service';
import { MongooseModule } from "@nestjs/mongoose";
import { VuelosSchema, UsuariosSchema, ReservasSchema, PagosSchema, OpinionesSchema } from "./schemas/viajes.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Vuelo',
        schema: VuelosSchema,
        collection: 'vuelos'
      },
      {
        name: 'Usuario',
        schema: UsuariosSchema,
        collection: 'usuarios'
      },
      {
        name: 'Reserva',
        schema: ReservasSchema,
        collection: 'reservas'
      },
      {
        name: 'Pago',
        schema: PagosSchema,
        collection: 'pagos'
      },
      {
        name: 'Opinion',
        schema: OpinionesSchema,
        collection: 'opiniones'
      }
    ])
  ],
  controllers: [ViajesController],
  providers: [ViajesService]
})
export class ViajesModule {}