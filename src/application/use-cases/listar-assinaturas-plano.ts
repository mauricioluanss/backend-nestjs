import { ErroNegocio } from '../../domain/errors/erro-negocio.js'
import type { AssinaturaRepository } from '../../domain/repositories/assinatura.repository.js'
import type { PlanoRepository } from '../../domain/repositories/plano.repository.js'

export class ListarAssinaturasPlano {
    constructor(
        private readonly assinaturas: AssinaturaRepository,
        private readonly planos: PlanoRepository,
    ) {}

    async executar(codigo: number) {
        if (!(await this.planos.getPlanoPorCodigo(codigo))) {
            throw new ErroNegocio('Plano não encontrado.', 'NAO_ENCONTRADO')
        }
        return this.assinaturas.getAssinaturasPorPlano(codigo)
    }
}
