import { ErroNegocio } from '../../domain/errors/erro-negocio.js'
import type { AssinaturaRepository } from '../../domain/repositories/assinatura.repository.js'

export class ListarAssinaturas {
    constructor(private readonly assinaturas: AssinaturaRepository) {}

    async executar(tipo: string, hoje: Date = new Date()) {
        if (!['TODOS', 'ATIVOS', 'CANCELADOS'].includes(tipo)) {
            throw new ErroNegocio(
                'Tipo deve ser TODOS, ATIVOS ou CANCELADOS.',
                'DADOS_INVALIDOS',
            )
        }
        const assinaturas = await this.assinaturas.getTodosAssinaturas()
        if (tipo === 'TODOS') return assinaturas
        return assinaturas.filter(
            (assinatura) => assinatura.estaAtiva(hoje) === (tipo === 'ATIVOS'),
        )
    }
}
