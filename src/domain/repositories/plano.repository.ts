import type { Plano } from '../entities/plano.entity.js'

export interface PlanoRepository {
    getTodosPlanos(): Promise<Plano[]>
    getPlanoPorCodigo(codigo: number): Promise<Plano | null>
    cadastraPlano(entidade: Plano): Promise<boolean>
    atualizaPlano(entidade: Plano): Promise<boolean>
    deletaPlano(codigo: number): Promise<boolean>
}
