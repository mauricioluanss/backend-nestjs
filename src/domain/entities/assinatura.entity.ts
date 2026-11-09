import { adicionarDias, somenteData } from '../utils/data.js'

export class Assinatura {
    constructor(
        private _codigo: number | null,
        private _codPlano: number,
        private _codCliente: number,
        private _inicioFidelidade: Date,
        private _fimFidelidade: Date,
        private _dataUltimoPagamento: Date,
        private _custoFinal: number,
        private _descricao: string,
    ) {}

    get codigo(): number | null {
        return this._codigo
    }
    get codPlano(): number {
        return this._codPlano
    }
    get codCliente(): number {
        return this._codCliente
    }
    get inicioFidelidade(): Date {
        return this._inicioFidelidade
    }
    get fimFidelidade(): Date {
        return this._fimFidelidade
    }
    get dataUltimoPagamento(): Date {
        return this._dataUltimoPagamento
    }
    get custoFinal(): number {
        return this._custoFinal
    }
    get descricao(): string {
        return this._descricao
    }

    get validade(): Date {
        return adicionarDias(this.dataUltimoPagamento, 30)
    }

    estaAtiva(hoje: Date = new Date()): boolean {
        return (
            this.inicioFidelidade <= somenteData(hoje) &&
            this.validade > somenteData(hoje)
        )
    }

    valorAtual(custoMensal: number, hoje: Date = new Date()): number {
        return somenteData(hoje) < this.fimFidelidade
            ? this.custoFinal
            : custoMensal
    }

    static criar(dados: {
        codigo?: number | null
        codPlano: number
        codCliente: number
        inicioFidelidade: Date
        fimFidelidade: Date
        dataUltimoPagamento: Date
        custoFinal: number
        descricao: string
    }): Assinatura {
        return new Assinatura(
            dados.codigo ?? null,
            dados.codPlano,
            dados.codCliente,
            somenteData(dados.inicioFidelidade),
            somenteData(dados.fimFidelidade),
            somenteData(dados.dataUltimoPagamento),
            dados.custoFinal,
            dados.descricao,
        )
    }
}
