export class Cliente {
    constructor(
        private _codigo: number | null,
        private _nome: string,
        private _email: string,
    ) {}

    get codigo(): number | null {
        return this._codigo
    }

    get nome(): string {
        return this._nome
    }

    get email(): string {
        return this._email
    }

    static criar(cliente: {
        codigo?: number | null
        nome: string
        email: string
    }) {
        return new Cliente(cliente.codigo ?? null, cliente.nome, cliente.email)
    }
}
