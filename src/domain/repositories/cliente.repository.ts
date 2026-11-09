import type { Cliente } from '../entities/cliente.entity.js'

export interface ClienteRepository {
    getTodosClientes(): Promise<Cliente[]>
    getClientePorCodigo(codigo: number): Promise<Cliente | null>
    cadastraCliente(entidade: Cliente): Promise<boolean>
    atualizaCliente(entidade: Cliente): Promise<boolean>
    deletaCliente(codigo: number): Promise<boolean>
}
