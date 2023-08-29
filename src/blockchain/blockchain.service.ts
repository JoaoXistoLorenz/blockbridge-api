/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blockchain } from './blockchain.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class BlockchainService {
  constructor(
    @InjectRepository(Blockchain)
    private blockchainRepository: Repository<Blockchain>,
  ) {}
  
  /* Recupera todos */
  async search(): Promise<Blockchain[]> {
    return await this.blockchainRepository.find();
  }

  /* Recupera por id */
  async findById(id: number): Promise<Blockchain> {
    return await this.blockchainRepository.findOne({ where: { id } });
  }

  /* Recupera ultimo registro */
  private async findLast(): Promise<Blockchain> {
    return await this.blockchainRepository.findOne({ order: {
      id: 'DESC',
    } });
  }

  /* Cria */
  async create(newBlockchain: Blockchain): Promise<Blockchain> {
    const blockchainInDb = await this.blockchainRepository.findOne({
      where: [{ nome: newBlockchain.nome }],
    });
    if (blockchainInDb) {
      throw new HttpException(`Blockchain já existe!`, HttpStatus.CONFLICT);
    }
    const lastBlockchain = await this.findLast();
    if (lastBlockchain.id) {
      newBlockchain.id = parseInt(lastBlockchain.id.toString()) + 1;
    }
    const blockchain: Blockchain = await this.blockchainRepository.create(newBlockchain);
    return await this.blockchainRepository.save(blockchain);
  }

  /* Atualiza */
  async update(id: number, entity: Blockchain): Promise<Blockchain> {
    const blockchainInDb = await this.blockchainRepository.findOne({
      where: [
        {
          id: Not(id),
          nome: entity.nome,
        },
      ],
    });
    if (blockchainInDb) {
      throw new HttpException(`Blockchain já existe!`, HttpStatus.CONFLICT);
    }
    const entityDB: Blockchain = await this.findById(id);
    return await (this.blockchainRepository.save({ ...entityDB, ...entity })) as Blockchain;
  }

  /* Exclui */
  async delete(id: number): Promise<Blockchain> {
    const entityDB: Blockchain = await this.findById(id);
    return (await this.blockchainRepository.remove(entityDB)) as Blockchain;
  }
}
