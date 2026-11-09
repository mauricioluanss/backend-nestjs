import { ErroNegocio } from '../../domain/errors/erro-negocio.js'
import type { AssinaturaRepository } from '../../domain/repositories/assinatura.repository.js'
import type { ClienteRepository } from '../../domain/repositories/cliente.repository.js'

export class ListarAssinaturasCliente {
    constructor(
        private readonly assinaturas: AssinaturaRepository,
        private readonly clientes: ClienteRepository,
    ) {}

    async executar(codigo: number) {
        if (!(await this.clientes.getClientePorCodigo(codigo))) {
            throw new ErroNegocio('Cliente não encontrado.', 'NAO_ENCONTRADO')
        }
        return this.assinaturas.getAssinaturasPorCliente(codigo)
    }
}
