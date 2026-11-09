import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cliente } from '../../domain/entities/cliente.entity.js'
import type { ClienteRepository } from '../../domain/repositories/cliente.repository.js'
import { ClienteOrmEntity } from '../database/cliente.orm-entity.js'

@Injectable()
export class ClienteRepositoryImpl implements ClienteRepository {
    constructor(
        @InjectRepository(ClienteOrmEntity)
        private readonly repository: Repository<ClienteOrmEntity>,
    ) {}

    async getTodosClientes(): Promise<Cliente[]> {
        const registros = await this.repository.find()
        return registros.map((registro) => this.paraDominio(registro))
    }

    async getClientePorCodigo(codigo: number): Promise<Cliente | null> {
        const registro = await this.repository.findOne({ where: { codigo } })
        return registro ? this.paraDominio(registro) : null
    }

    async cadastraCliente(entidade: Cliente): Promise<boolean> {
        try {
            const registro = this.repository.create(
                this.paraPersistencia(entidade),
            )
            await this.repository.save(registro)
            return true
        } catch {
            return false
        }
    }

    async atualizaCliente(entidade: Cliente): Promise<boolean> {
        if (entidade.codigo === null) return false
        try {
            const resultado = await this.repository.update(
                entidade.codigo,
                this.paraPersistencia(entidade),
            )
            return (resultado.affected ?? 0) > 0
        } catch {
            return false
        }
    }

    async deletaCliente(codigo: number): Promise<boolean> {
        try {
            const resultado = await this.repository.delete(codigo)
            return (resultado.affected ?? 0) > 0
        } catch {
            return false
        }
    }

    private paraPersistencia(entidade: Cliente) {
        return {
            nome: entidade.nome,
            email: entidade.email,
        }
    }

    private paraDominio(registro: ClienteOrmEntity): Cliente {
        return Cliente.criar({
            codigo: registro.codigo,
            nome: registro.nome,
            email: registro.email,
        })
    }
}
