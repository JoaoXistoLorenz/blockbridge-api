/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlataformaBlockchain } from './plataforma-blockchain.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlataformaBlockchainService {
  constructor(
    @InjectRepository(PlataformaBlockchain)
    private plataformaBlockchainRepository: Repository<PlataformaBlockchain>,
  ) {}
  
  /* Recupera todos */
  async search(): Promise<PlataformaBlockchain[]> {
    return await this.plataformaBlockchainRepository.find({ relations: ['idBlockchain', 'idPlataforma']});
  }

  /* Recupera por id */
  async findById(id: number): Promise<PlataformaBlockchain> {
    return await this.plataformaBlockchainRepository.findOne({ where: { id }, relations: ['idBlockchain', 'idPlataforma'] });
  }

  /* Cria */
  async create(newPlataformaBlockchain: PlataformaBlockchain): Promise<PlataformaBlockchain> {
    const plataformaBlockchain: PlataformaBlockchain = await this.plataformaBlockchainRepository.create(newPlataformaBlockchain);
    return await this.plataformaBlockchainRepository.save(plataformaBlockchain);
  }

  /* Atualiza */
  async update(id: number, entity: PlataformaBlockchain): Promise<PlataformaBlockchain> {
    const entityDB: PlataformaBlockchain = await this.findById(id);
    return await (this.plataformaBlockchainRepository.save({ ...entityDB, ...entity })) as PlataformaBlockchain;
  }

  /* Exclui */
  async delete(id: number): Promise<PlataformaBlockchain> {
    const entityDB: PlataformaBlockchain = await this.findById(id);
    return (await this.plataformaBlockchainRepository.remove(entityDB)) as PlataformaBlockchain;
  }

  /* Exclui por plataforma */
  async deleteByPlataforma(id: number): Promise<void> {
    await this.plataformaBlockchainRepository
      .createQueryBuilder()
      .delete()
      .from(PlataformaBlockchain)
      .where("idPlataforma = :id", { id })
      .execute();
  }
}
