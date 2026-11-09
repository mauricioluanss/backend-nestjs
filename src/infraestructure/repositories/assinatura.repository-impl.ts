import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Assinatura } from '../../domain/entities/assinatura.entity.js'
import type { AssinaturaRepository } from '../../domain/repositories/assinatura.repository.js'
import { AssinaturaOrmEntity } from '../database/assinatura.orm-entity.js'

@Injectable()
export class AssinaturaRepositoryImpl implements AssinaturaRepository {
    constructor(
        @InjectRepository(AssinaturaOrmEntity)
        private readonly repository: Repository<AssinaturaOrmEntity>,
    ) {}

    async getTodosAssinaturas(): Promise<Assinatura[]> {
        const registros = await this.repository.find({
            relations: { codPlano: true, codCliente: true },
        })
        return registros.map((registro) => this.paraDominio(registro))
    }

    async getAssinaturaPorCodigo(codigo: number): Promise<Assinatura | null> {
        const registro = await this.repository.findOne({
            where: { codigo },
            relations: { codPlano: true, codCliente: true },
        })
        return registro ? this.paraDominio(registro) : null
    }

    async getAssinaturasPorCliente(codigo: number): Promise<Assinatura[]> {
        const registros = await this.repository.find({
            where: { codCliente: { codigo } },
            relations: { codPlano: true, codCliente: true },
            order: { codigo: 'ASC' },
        })
        return registros.map((registro) => this.paraDominio(registro))
    }

    async getAssinaturasPorPlano(codigo: number): Promise<Assinatura[]> {
        const registros = await this.repository.find({
            where: { codPlano: { codigo } },
            relations: { codPlano: true, codCliente: true },
            order: { codigo: 'ASC' },
        })
        return registros.map((registro) => this.paraDominio(registro))
    }

    async cadastraAssinatura(entidade: Assinatura): Promise<Assinatura> {
        const registro = this.repository.create(this.paraPersistencia(entidade))
        const salvo = await this.repository.save(registro)
        return this.paraDominio(salvo)
    }

    async atualizaAssinatura(entidade: Assinatura): Promise<boolean> {
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

    async deletaAssinatura(codigo: number): Promise<boolean> {
        try {
            const resultado = await this.repository.delete(codigo)
            return (resultado.affected ?? 0) > 0
        } catch {
            return false
        }
    }

    private paraPersistencia(entidade: Assinatura) {
        return {
            codPlano: { codigo: entidade.codPlano },
            codCliente: { codigo: entidade.codCliente },
            inicioFidelidade: entidade.inicioFidelidade,
            fimFidelidade: entidade.fimFidelidade,
            dataUltimoPagamento: entidade.dataUltimoPagamento,
            custoFinal: entidade.custoFinal,
            descricao: entidade.descricao,
        }
    }

    private paraDominio(registro: AssinaturaOrmEntity): Assinatura {
        return Assinatura.criar({
            codigo: registro.codigo,
            codPlano: registro.codPlano.codigo,
            codCliente: registro.codCliente.codigo,
            inicioFidelidade: registro.inicioFidelidade,
            fimFidelidade: registro.fimFidelidade,
            dataUltimoPagamento: registro.dataUltimoPagamento,
            custoFinal: registro.custoFinal,
            descricao: registro.descricao,
        })
    }
}
