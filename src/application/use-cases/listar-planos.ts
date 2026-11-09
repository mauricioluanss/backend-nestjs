import type { PlanoRepository } from '../../domain/repositories/plano.repository.js'

export class ListarPlanos {
    constructor(private readonly planos: PlanoRepository) {}

    executar() {
        return this.planos.getTodosPlanos()
    }
}
