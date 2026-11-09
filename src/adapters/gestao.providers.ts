import type { ClienteRepository } from '../domain/repositories/cliente.repository.js'
import type { PlanoRepository } from '../domain/repositories/plano.repository.js'
import type { AssinaturaRepository } from '../domain/repositories/assinatura.repository.js'
import { ClienteRepositoryImpl } from '../infraestructure/repositories/cliente.repository-impl.js'
import { PlanoRepositoryImpl } from '../infraestructure/repositories/plano.repository-impl.js'
import { AssinaturaRepositoryImpl } from '../infraestructure/repositories/assinatura.repository-impl.js'
import { ListarClientes } from '../application/use-cases/listar-clientes.js'
import { ListarPlanos } from '../application/use-cases/listar-planos.js'
import { CriarAssinatura } from '../application/use-cases/criar-assinatura.js'
import { AtualizarCustoPlano } from '../application/use-cases/atualizar-custo-plano.js'
import { ListarAssinaturas } from '../application/use-cases/listar-assinaturas.js'
import { ListarAssinaturasCliente } from '../application/use-cases/listar-assinaturas-cliente.js'
import { ListarAssinaturasPlano } from '../application/use-cases/listar-assinaturas-plano.js'

export const gestaoProviders = [
    { provide: 'ClienteRepository', useClass: ClienteRepositoryImpl },
    { provide: 'PlanoRepository', useClass: PlanoRepositoryImpl },
    { provide: 'AssinaturaRepository', useClass: AssinaturaRepositoryImpl },
    {
        provide: ListarClientes,
        inject: ['ClienteRepository'],
        useFactory: (clientes: ClienteRepository) =>
            new ListarClientes(clientes),
    },
    {
        provide: ListarPlanos,
        inject: ['PlanoRepository'],
        useFactory: (planos: PlanoRepository) => new ListarPlanos(planos),
    },
    {
        provide: CriarAssinatura,
        inject: [
            'AssinaturaRepository',
            'ClienteRepository',
            'PlanoRepository',
        ],
        useFactory: (
            assinaturas: AssinaturaRepository,
            clientes: ClienteRepository,
            planos: PlanoRepository,
        ) => new CriarAssinatura(assinaturas, clientes, planos),
    },
    {
        provide: AtualizarCustoPlano,
        inject: ['PlanoRepository'],
        useFactory: (planos: PlanoRepository) =>
            new AtualizarCustoPlano(planos),
    },
    {
        provide: ListarAssinaturas,
        inject: ['AssinaturaRepository'],
        useFactory: (assinaturas: AssinaturaRepository) =>
            new ListarAssinaturas(assinaturas),
    },
    {
        provide: ListarAssinaturasCliente,
        inject: ['AssinaturaRepository', 'ClienteRepository'],
        useFactory: (
            assinaturas: AssinaturaRepository,
            clientes: ClienteRepository,
        ) => new ListarAssinaturasCliente(assinaturas, clientes),
    },
    {
        provide: ListarAssinaturasPlano,
        inject: ['AssinaturaRepository', 'PlanoRepository'],
        useFactory: (
            assinaturas: AssinaturaRepository,
            planos: PlanoRepository,
        ) => new ListarAssinaturasPlano(assinaturas, planos),
    },
]
