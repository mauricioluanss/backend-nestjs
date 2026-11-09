import type { ClienteRepository } from '../../domain/repositories/cliente.repository.js'

export class ListarClientes {
    constructor(private readonly clientes: ClienteRepository) {}

    executar() {
        return this.clientes.getTodosClientes()
    }
}
