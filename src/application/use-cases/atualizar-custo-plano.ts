import { ErroNegocio } from '../../domain/errors/erro-negocio.js'
import type { PlanoRepository } from '../../domain/repositories/plano.repository.js'

export class AtualizarCustoPlano {
    constructor(private readonly planos: PlanoRepository) {}

    async executar(
        codigo: number,
        custoMensal: number,
        hoje: Date = new Date(),
    ) {
        const plano = await this.planos.getPlanoPorCodigo(codigo)
        if (!plano)
            throw new ErroNegocio('Plano não encontrado.', 'NAO_ENCONTRADO')
        plano.atualizarCusto(custoMensal, hoje)
        if (!(await this.planos.atualizaPlano(plano))) {
            throw new ErroNegocio(
                'Não foi possível atualizar o plano.',
                'FALHA_PERSISTENCIA',
            )
        }
        return plano
    }
}
