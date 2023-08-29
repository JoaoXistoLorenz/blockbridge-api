/* eslint-disable prettier/prettier */
import { PlataformaBlockchain } from 'src/plataforma-blockchain/plataforma-blockchain.entity';
import { TipoEscalabilidade } from 'src/tipo-escalabilidade/tipo-escalabilidade.entity';
import { TipoMenu } from 'src/tipo-menu/tipo-menu.entity';

import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  Generated,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Plataforma extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int8' })
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true})
  nome: string;

  @ManyToOne(() => TipoMenu, (tipoMenu) => tipoMenu.id, { eager: true })
  tipoMenu: TipoMenu;

  @ManyToOne(() => TipoEscalabilidade, (tipoEscalabilidade) => tipoEscalabilidade.id, { eager: true })
  tipoEscalabilidade: TipoEscalabilidade;

  @Column({ nullable: false, type: 'varchar'})
  descricao: string;

  @Column({ nullable: false, type: 'varchar'})
  imagem: string;

  @Column({ nullable: false, type: 'varchar'})
  urlsite: string;

  @Column({ nullable: true, type: 'varchar'})
  urlgit: string;

  @Column({ nullable: true, type: 'varchar'})
  urldoc: string;

  @Column({ nullable: true, type: 'varchar'})
  urlinsta: string;

  @Column({ nullable: true, type: 'varchar'})
  urltel: string;

  @Column({ nullable: true, type: 'varchar'})
  urltwt: string;

  @Column({ nullable: true, type: 'varchar'})
  urldisc: string;

  @Column({ nullable: true, type: 'varchar'})
  urlcap: string;

  @Column({ nullable: true, type: 'varchar'})
  urltrading: string;

  @Column({ nullable: true, type: 'varchar'})
  urlbinance: string;

  @Column({ nullable: true, type: 'varchar'})
  urlcoinbase: string;

  @OneToMany(() => PlataformaBlockchain, (plataformaBlockchain) => plataformaBlockchain.idPlataforma, { cascade: true, eager: true })
  blockchains: PlataformaBlockchain[];
}
    