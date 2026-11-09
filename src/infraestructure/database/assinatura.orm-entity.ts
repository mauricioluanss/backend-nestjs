import { PlanoOrmEntity } from './plano.orm-entity.js'
import { ClienteOrmEntity } from './cliente.orm-entity.js'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('Assinatura')
export class AssinaturaOrmEntity {
    @PrimaryGeneratedColumn()
    codigo: number

    @ManyToOne(() => PlanoOrmEntity, { nullable: false })
    @JoinColumn({ name: 'codPlano', referencedColumnName: 'codigo' })
    codPlano: PlanoOrmEntity

    @ManyToOne(() => ClienteOrmEntity, { nullable: false })
    @JoinColumn({ name: 'codCliente', referencedColumnName: 'codigo' })
    codCliente: ClienteOrmEntity

    @Column({ type: 'datetime' })
    inicioFidelidade: Date

    @Column({ type: 'datetime' })
    fimFidelidade: Date

    @Column({ type: 'datetime' })
    dataUltimoPagamento: Date

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
            to: (valor: number) => valor,
            from: (valor: string) => Number(valor),
        },
    })
    custoFinal: number

    @Column({ type: 'varchar', length: 255 })
    descricao: string
}
