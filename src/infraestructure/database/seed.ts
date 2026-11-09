import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import type { EntityManager } from 'typeorm'
import { configuracaoBanco } from './configuracao.js'
import { ClienteOrmEntity } from './cliente.orm-entity.js'
import { PlanoOrmEntity } from './plano.orm-entity.js'
import { AssinaturaOrmEntity } from './assinatura.orm-entity.js'
import { adicionarDias, somenteData } from '../../domain/utils/data.js'

export async function popularBanco(
    gerente: EntityManager,
    hoje: Date = new Date(),
) {
    for (let codigo = 1; codigo <= 10; codigo++) {
        if (!(await gerente.existsBy(ClienteOrmEntity, { codigo }))) {
            await gerente.save(ClienteOrmEntity, {
                codigo,
                nome: `Cliente ${codigo}`,
                email: `cliente${codigo}@exemplo.com`,
            })
        }
    }
    const nomes = [
        'Fibra 100 Mega',
        'Fibra 300 Mega',
        'Fibra 500 Mega',
        'Fibra com TV',
        'Empresarial',
    ]
    for (let codigo = 1; codigo <= 5; codigo++) {
        if (!(await gerente.existsBy(PlanoOrmEntity, { codigo }))) {
            await gerente.save(PlanoOrmEntity, {
                codigo,
                nome: nomes[codigo - 1],
                custoMensal: 49.9 + (codigo - 1) * 20,
                data: somenteData(hoje),
                descricao: `Plano ${nomes[codigo - 1]} da operadora.`,
            })
        }
        if (!(await gerente.existsBy(AssinaturaOrmEntity, { codigo }))) {
            const inicio = adicionarDias(hoje, -60)
            await gerente.save(AssinaturaOrmEntity, {
                codigo,
                codPlano: { codigo },
                codCliente: { codigo },
                inicioFidelidade: inicio,
                fimFidelidade: adicionarDias(inicio, 365),
                dataUltimoPagamento: adicionarDias(
                    hoje,
                    codigo <= 3 ? -5 : -40,
                ),
                custoFinal: 39.9 + (codigo - 1) * 20,
                descricao:
                    'Desconto de R$ 10,00 durante os 365 dias de fidelidade.',
            })
        }
    }
}

async function executar() {
    const banco = new DataSource(configuracaoBanco())
    try {
        await banco.initialize()
        await banco.transaction((gerente) => popularBanco(gerente))
        console.log(
            'Banco inicializado: pelo menos 10 clientes, 5 planos e 5 assinaturas.',
        )
    } finally {
        if (banco.isInitialized) await banco.destroy()
    }
}

if (
    process.argv[1] &&
    resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
    executar().catch((erro) => {
        console.error('Não foi possível popular o banco:', erro.message)
        process.exitCode = 1
    })
}
