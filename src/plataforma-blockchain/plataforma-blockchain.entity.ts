/* eslint-disable prettier/prettier */
import { Blockchain } from '../blockchain/blockchain.entity';
import { Plataforma } from '../plataforma/plataforma.entity';
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Generated,
  ManyToOne,
} from 'typeorm';

@Entity()
export class PlataformaBlockchain extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int8' })
  id: number;

  @ManyToOne(() => Blockchain, (blockchain) => blockchain.id, { eager: true })
  idBlockchain: Blockchain;

  @ManyToOne(() => Plataforma, (plataforma) => plataforma.id, { onDelete: 'CASCADE' })
  idPlataforma: Plataforma;
}
