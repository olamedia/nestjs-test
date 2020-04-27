import { Column, Entity, PrimaryColumn } from 'typeorm'

export interface Review {
  id: string | null
  from: string
  to: string | null
  reason: string
}

@Entity()
export class Review {
  @PrimaryColumn({ length: 16 })
  id: string

  @Column({ length: 16, nullable: true })
  from: string | null

  @Column({ length: 16 })
  to: string

  @Column()
  reason: string
}
