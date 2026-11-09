import { validarValor } from '../utils/valor.js'
import { somenteData } from '../utils/data.js'

export class Plano {
    constructor(
        private _codigo: number | null,
        private _nome: string,
        private _custoMensal: number,
        private _data: Date,
        private _descricao: string,
    ) {}

    get codigo(): number | null {
        return this._codigo
    }

    get nome(): string {
        return this._nome
    }

    get custoMensal(): number {
        return this._custoMensal
    }

    get data(): Date {
        return this._data
    }

    get descricao(): string {
        return this._descricao
    }

    atualizarCusto(custoMensal: number, hoje: Date = new Date()): void {
        this._custoMensal = validarValor(custoMensal)
        this._data = somenteData(hoje)
    }

    static criar(dados: {
        codigo?: number | null
        nome: string
        custoMensal: number
        data: Date
        descricao: string
    }): Plano {
        return new Plano(
            dados.codigo ?? null,
            dados.nome,
            dados.custoMensal,
            dados.data,
            dados.descricao,
        )
    }
}
