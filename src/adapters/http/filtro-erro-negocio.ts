import { Catch } from '@nestjs/common'
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import type { Response } from 'express'
import { ErroNegocio } from '../../domain/errors/erro-negocio.js'

@Catch(ErroNegocio)
export class FiltroErroNegocio implements ExceptionFilter {
    catch(erro: ErroNegocio, host: ArgumentsHost) {
        const status =
            erro.tipo === 'NAO_ENCONTRADO'
                ? 404
                : erro.tipo === 'DADOS_INVALIDOS'
                  ? 400
                  : 500
        host.switchToHttp().getResponse<Response>().status(status).json({
            statusCode: status,
            message: erro.message,
        })
    }
}
