import { validarValor } from '../../domain/utils/valor.js'
import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { ListarClientes } from '../../application/use-cases/listar-clientes.js'
import { ListarPlanos } from '../../application/use-cases/listar-planos.js'
import { CriarAssinatura } from '../../application/use-cases/criar-assinatura.js'
import { AtualizarCustoPlano } from '../../application/use-cases/atualizar-custo-plano.js'
import { ListarAssinaturas } from '../../application/use-cases/listar-assinaturas.js'
import { ListarAssinaturasCliente } from '../../application/use-cases/listar-assinaturas-cliente.js'
import { ListarAssinaturasPlano } from '../../application/use-cases/listar-assinaturas-plano.js'
import {
    apresentarCliente,
    apresentarPlano,
    apresentarAssinatura,
    apresentarResumoAssinatura,
} from '../http/apresentadores.js'
import {
    validarCodigo,
    validarCorpo,
    validarDescricao,
} from '../http/validacao.js'

@Controller('gestao')
export class GestaoController {
    constructor(
        @Inject(ListarClientes) private readonly listarClientes: ListarClientes,
        @Inject(ListarPlanos) private readonly listarPlanos: ListarPlanos,
        @Inject(CriarAssinatura)
        private readonly criarAssinatura: CriarAssinatura,
        @Inject(AtualizarCustoPlano)
        private readonly atualizarCusto: AtualizarCustoPlano,
        @Inject(ListarAssinaturas)
        private readonly listarAssinaturas: ListarAssinaturas,
        @Inject(ListarAssinaturasCliente)
        private readonly assinaturasCliente: ListarAssinaturasCliente,
        @Inject(ListarAssinaturasPlano)
        private readonly assinaturasPlano: ListarAssinaturasPlano,
    ) {}

    @Get('clientes')
    async clientes() {
        return (await this.listarClientes.executar()).map(apresentarCliente)
    }

    @Get('planos')
    async planos() {
        return (await this.listarPlanos.executar()).map(apresentarPlano)
    }

    @Post('assinaturas')
    async novaAssinatura(@Body() corpo: unknown) {
        const dados = validarCorpo(corpo)
        const assinatura = await this.criarAssinatura.executar({
            codCli: validarCodigo(dados.codCli),
            codPlano: validarCodigo(dados.codPlano),
            custoFinal: validarValor(dados.custoFinal),
            descricao: validarDescricao(dados.descricao),
        })
        return apresentarAssinatura(assinatura)
    }

    @Patch('planos/:idPlano')
    async atualizarPlano(
        @Param('idPlano') codigo: string,
        @Body() corpo: unknown,
    ) {
        const dados = validarCorpo(corpo)
        const plano = await this.atualizarCusto.executar(
            validarCodigo(codigo),
            validarValor(dados.custoMensal),
        )
        return apresentarPlano(plano)
    }

    @Get('assinaturas/:tipo')
    async assinaturas(@Param('tipo') tipo: string) {
        return (await this.listarAssinaturas.executar(tipo)).map(
            apresentarResumoAssinatura,
        )
    }

    @Get('assinaturascliente/:codcli')
    async porCliente(@Param('codcli') codigo: string) {
        return (
            await this.assinaturasCliente.executar(validarCodigo(codigo))
        ).map(apresentarResumoAssinatura)
    }

    @Get('assinaturasplano/:codplano')
    async porPlano(@Param('codplano') codigo: string) {
        return (
            await this.assinaturasPlano.executar(validarCodigo(codigo))
        ).map(apresentarResumoAssinatura)
    }
}
