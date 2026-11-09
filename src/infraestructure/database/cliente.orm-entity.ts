import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Cliente')
export class ClienteOrmEntity {
    @PrimaryGeneratedColumn()
    codigo: number

    @Column({ type: 'varchar', length: 255 })
    nome: string

    @Column({ type: 'varchar', length: 255 })
    email: string
}
