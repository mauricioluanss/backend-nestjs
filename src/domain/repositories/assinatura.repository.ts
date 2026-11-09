import type { Assinatura } from '../entities/assinatura.entity.js'

export interface AssinaturaRepository {
    getTodosAssinaturas(): Promise<Assinatura[]>
    getAssinaturasPorCliente(codigo: number): Promise<Assinatura[]>
    getAssinaturasPorPlano(codigo: number): Promise<Assinatura[]>
    getAssinaturaPorCodigo(codigo: number): Promise<Assinatura | null>
    cadastraAssinatura(entidade: Assinatura): Promise<Assinatura>
    atualizaAssinatura(entidade: Assinatura): Promise<boolean>
    deletaAssinatura(codigo: number): Promise<boolean>
}
