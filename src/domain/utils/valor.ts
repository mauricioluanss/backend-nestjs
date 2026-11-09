import { ErroNegocio } from '../errors/erro-negocio.js'

export function validarValor(valor: unknown): number {
    if (
        typeof valor !== 'number' ||
        !Number.isFinite(valor) ||
        valor <= 0 ||
        valor > 99999999.99 ||
        Math.abs(valor * 100 - Math.round(valor * 100)) > 0.000001
    ) {
        throw new ErroNegocio(
            'O valor deve ser positivo, com até duas casas decimais e no máximo 99999999.99.',
            'DADOS_INVALIDOS',
        )
    }
    return valor
}
