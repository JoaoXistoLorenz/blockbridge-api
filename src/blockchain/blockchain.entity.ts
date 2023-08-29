/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  Column,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Blockchain extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int8' })
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true})
  nome: string;

  @Column({ nullable: true, type: 'varchar'})
  sigla: string;

  @Column({ nullable: true, type: 'varchar'})
  descricao: string;

  @Column({ nullable: true, type: 'varchar'})
  url: string;

  @Column({ nullable: true, type: 'varchar'})
  imagem: string;
}
