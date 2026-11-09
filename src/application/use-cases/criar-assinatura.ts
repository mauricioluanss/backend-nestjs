import { validarValor } from '../../domain/utils/valor.js'
import { Assinatura } from '../../domain/entities/assinatura.entity.js'
import { ErroNegocio } from '../../domain/errors/erro-negocio.js'
import type { AssinaturaRepository } from '../../domain/repositories/assinatura.repository.js'
import type { ClienteRepository } from '../../domain/repositories/cliente.repository.js'
import type { PlanoRepository } from '../../domain/repositories/plano.repository.js'
import { adicionarDias, somenteData } from '../../domain/utils/data.js'

export interface DadosNovaAssinatura {
    codCli: number
    codPlano: number
    custoFinal: number
    descricao: string
}

export class CriarAssinatura {
    constructor(
        private readonly assinaturas: AssinaturaRepository,
        private readonly clientes: ClienteRepository,
        private readonly planos: PlanoRepository,
    ) {}

    async executar(dados: DadosNovaAssinatura, hoje: Date = new Date()) {
        const cliente = await this.clientes.getClientePorCodigo(dados.codCli)
        if (!cliente)
            throw new ErroNegocio('Cliente não encontrado.', 'NAO_ENCONTRADO')
        const plano = await this.planos.getPlanoPorCodigo(dados.codPlano)
        if (!plano)
            throw new ErroNegocio('Plano não encontrado.', 'NAO_ENCONTRADO')

        const assinatura = Assinatura.criar({
            codCliente: dados.codCli,
            codPlano: dados.codPlano,
            inicioFidelidade: somenteData(hoje),
            fimFidelidade: adicionarDias(hoje, 365),
            // A contratação inicia os primeiros 30 dias de acesso.
            dataUltimoPagamento: somenteData(hoje),
            custoFinal: validarValor(dados.custoFinal),
            descricao: dados.descricao,
        })
        return this.assinaturas.cadastraAssinatura(assinatura)
    }
}
