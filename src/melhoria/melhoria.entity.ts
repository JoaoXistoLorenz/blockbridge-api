/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  Column,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Melhoria extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int8' })
  id: number;

  @Column({ nullable: false, type: 'varchar'})
  titulo: string;

  @Column({ nullable: true, type: 'varchar'})
  url: string;

  @Column({ nullable: true, type: 'varchar'})
  ip: string;

  @Column({ nullable: false, type: 'timestamp'})
  data: string;

  @Column({ nullable: false, type: 'integer'})
  tipo: number;

  @Column({ nullable: false, type: 'varchar'})
  descricao: string;
}
    