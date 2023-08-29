/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  Column,
  BeforeInsert,
  Generated,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Usuario extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int8' })
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true})
  login: string;

  @Column({ nullable: false, type: 'varchar'})
  senha: string;

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
}
  