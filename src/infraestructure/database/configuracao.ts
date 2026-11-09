import type { DataSourceOptions } from 'typeorm'
import { ClienteOrmEntity } from './cliente.orm-entity.js'
import { PlanoOrmEntity } from './plano.orm-entity.js'
import { AssinaturaOrmEntity } from './assinatura.orm-entity.js'

export const entidadesGestao = [
    ClienteOrmEntity,
    PlanoOrmEntity,
    AssinaturaOrmEntity,
]

export function configuracaoBanco() {
    return {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'gestao',
        password: 'gestao',
        database: 'controle-planos-operadora',
        timezone: 'Z',
        charset: 'utf8mb4',
        synchronize: true,
        entities: entidadesGestao,
    } satisfies DataSourceOptions
}
