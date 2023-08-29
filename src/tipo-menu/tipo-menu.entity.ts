/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  Column,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class TipoMenu extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int8' })
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true})
  nome: string;
}
  