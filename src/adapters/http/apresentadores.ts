import type { Cliente } from '../../domain/entities/cliente.entity.js'
import type { Plano } from '../../domain/entities/plano.entity.js'
import type { Assinatura } from '../../domain/entities/assinatura.entity.js'
import { formatarData } from '../../domain/utils/data.js'

export function apresentarCliente(cliente: Cliente) {
    return { codigo: cliente.codigo, nome: cliente.nome, email: cliente.email }
}

export function apresentarPlano(plano: Plano) {
    return {
        codigo: plano.codigo,
        nome: plano.nome,
        custoMensal: plano.custoMensal,
        data: formatarData(plano.data),
        descricao: plano.descricao,
    }
}

export function apresentarAssinatura(assinatura: Assinatura) {
    return {
        codigo: assinatura.codigo,
        codCli: assinatura.codCliente,
        codPlano: assinatura.codPlano,
        inicioFidelidade: formatarData(assinatura.inicioFidelidade),
        fimFidelidade: formatarData(assinatura.fimFidelidade),
        dataUltimoPagamento: formatarData(assinatura.dataUltimoPagamento),
        custoFinal: assinatura.custoFinal,
        descricao: assinatura.descricao,
    }
}

export function apresentarResumoAssinatura(assinatura: Assinatura) {
    return {
        codigo: assinatura.codigo,
        codCli: assinatura.codCliente,
        codPlano: assinatura.codPlano,
        dataInicio: formatarData(assinatura.inicioFidelidade),
        dataFim: formatarData(assinatura.validade),
        status: assinatura.estaAtiva() ? 'ATIVO' : 'CANCELADO',
    }
}
