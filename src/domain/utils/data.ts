export function somenteData(data: Date): Date {
    return new Date(
        Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate()),
    )
}

export function adicionarDias(data: Date, dias: number): Date {
    const resultado = somenteData(data)
    resultado.setUTCDate(resultado.getUTCDate() + dias)
    return resultado
}

export function formatarData(data: Date): string {
    return data.toISOString().slice(0, 10)
}
