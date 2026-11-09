import { BadRequestException } from '@nestjs/common'

export function validarCodigo(valor: unknown): number {
    const codigo =
        typeof valor === 'string' && /^\d+$/.test(valor) ? Number(valor) : valor
    if (
        typeof codigo !== 'number' ||
        !Number.isInteger(codigo) ||
        codigo <= 0 ||
        codigo > 2147483647
    ) {
        throw new BadRequestException(
            'O código deve ser um número inteiro positivo válido.',
        )
    }
    return codigo
}

export function validarCorpo(corpo: unknown): Record<string, unknown> {
    if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) {
        throw new BadRequestException(
            'Informe um objeto JSON no corpo da requisição.',
        )
    }
    return corpo as Record<string, unknown>
}

export function validarDescricao(valor: unknown): string {
    if (
        typeof valor !== 'string' ||
        !valor.trim() ||
        valor.trim().length > 255
    ) {
        throw new BadRequestException(
            'A descrição deve conter entre 1 e 255 caracteres.',
        )
    }
    return valor.trim()
}
