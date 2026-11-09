import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Plano')
export class PlanoOrmEntity {
    @PrimaryGeneratedColumn()
    codigo: number

    @Column({ type: 'varchar', length: 255 })
    nome: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
            to: (valor: number) => valor,
            from: (valor: string) => Number(valor),
        },
    })
    custoMensal: number

    @Column({ type: 'datetime' })
    data: Date

    @Column({ type: 'varchar', length: 255 })
    descricao: string
}
