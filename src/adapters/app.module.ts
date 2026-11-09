import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
    configuracaoBanco,
    entidadesGestao,
} from '../infraestructure/database/configuracao.js'
import { GestaoController } from './controllers/gestao.controller.js'
import { gestaoProviders } from './gestao.providers.js'
import { FiltroErroNegocio } from './http/filtro-erro-negocio.js'

@Module({
    imports: [
        TypeOrmModule.forRoot(configuracaoBanco()),
        TypeOrmModule.forFeature(entidadesGestao),
    ],
    controllers: [GestaoController],
    providers: [
        ...gestaoProviders,
        { provide: APP_FILTER, useClass: FiltroErroNegocio },
    ],
})
export class AppModule {}
