/* eslint-disable prettier/prettier */

import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  Generated,
  PrimaryColumn,
} from 'typeorm';
import { Plataforma } from '../plataforma/plataforma.entity';

@Entity()
export class Link extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int8' })
  id: number;

  @Column({ nullable: false, type: 'integer'})
  tipo: number;

  @Column({ nullable: false, type: 'varchar'})
  url: string;

  @Column({ nullable: true, type: 'varchar'})
  imagem: string;

  @Column({ nullable: true, type: 'varchar'})
  bg: string;

  @Column({ nullable: true, type: 'varchar'})
  icone: string;

  @Column({ nullable: true, type: 'varchar'})
  color: string;

  @Column({ nullable: true, type: 'varchar'})
  nome: string;

  @ManyToOne(() => Plataforma, (plataforma) => plataforma.id, { onDelete: 'CASCADE' })
  plataforma: Plataforma;
}
    