export class ErroNegocio extends Error {
    constructor(
        mensagem: string,
        public readonly tipo:
            'DADOS_INVALIDOS' | 'NAO_ENCONTRADO' | 'FALHA_PERSISTENCIA',
    ) {
        super(mensagem)
    }
}
