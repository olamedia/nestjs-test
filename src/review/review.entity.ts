import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryColumn({ length: 16 })
  id: string;

  @Column({ length: 16, nullable: true })
  from: string;

  @Column({ length: 16 })
  to: string;

  @Column()
  reason: string;
}
