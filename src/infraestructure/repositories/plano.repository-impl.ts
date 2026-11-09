import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Plano } from '../../domain/entities/plano.entity.js'
import type { PlanoRepository } from '../../domain/repositories/plano.repository.js'
import { PlanoOrmEntity } from '../database/plano.orm-entity.js'

@Injectable()
export class PlanoRepositoryImpl implements PlanoRepository {
    constructor(
        @InjectRepository(PlanoOrmEntity)
        private readonly repository: Repository<PlanoOrmEntity>,
    ) {}

    async getTodosPlanos(): Promise<Plano[]> {
        const registros = await this.repository.find()
        return registros.map((registro) => this.paraDominio(registro))
    }

    async getPlanoPorCodigo(codigo: number): Promise<Plano | null> {
        const registro = await this.repository.findOne({ where: { codigo } })
        return registro ? this.paraDominio(registro) : null
    }

    async cadastraPlano(entidade: Plano): Promise<boolean> {
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

    async atualizaPlano(entidade: Plano): Promise<boolean> {
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

    async deletaPlano(codigo: number): Promise<boolean> {
        try {
            const resultado = await this.repository.delete(codigo)
            return (resultado.affected ?? 0) > 0
        } catch {
            return false
        }
    }

    private paraPersistencia(entidade: Plano) {
        return {
            nome: entidade.nome,
            custoMensal: entidade.custoMensal,
            data: entidade.data,
            descricao: entidade.descricao,
        }
    }

    private paraDominio(registro: PlanoOrmEntity): Plano {
        return Plano.criar({
            codigo: registro.codigo,
            nome: registro.nome,
            custoMensal: registro.custoMensal,
            data: registro.data,
            descricao: registro.descricao,
        })
    }
}
