/* eslint-disable prettier/prettier */
import { TipoEscalabilidade } from '../tipo-escalabilidade/tipo-escalabilidade.entity';
import { TipoMenu } from '../tipo-menu/tipo-menu.entity';
import { PlataformaBlockchain } from '../plataforma-blockchain/plataforma-blockchain.entity';
import { Link } from '../link/link.entity';

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

  @OneToMany(() => PlataformaBlockchain, (plataformaBlockchain) => plataformaBlockchain.idPlataforma, { cascade: true, eager: true })
  blockchains: PlataformaBlockchain[];

  @OneToMany(() => Link, (link) => link.plataforma, { cascade: true, eager: true })
  links: Link[];

  @Column({ nullable: true, type: 'varchar'})
  idcoinmarketcap: string;

  @Column({ nullable: true, type: 'varchar'})
  simbolotrading: string;

  @Column({ nullable: true, type: 'varchar'})
  cryptopanic: string;

  @Column({ nullable: true, type: 'varchar'})
  tvl: string;
}
    