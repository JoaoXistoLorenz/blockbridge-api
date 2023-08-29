/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Melhoria } from './melhoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MelhoriaService {
  constructor(
    @InjectRepository(Melhoria)
    private melhoriaRepository: Repository<Melhoria>,
  ) {}
  
  /* Recupera todos */
  async search(): Promise<Melhoria[]> {
    return await this.melhoriaRepository.find();
  }

  /* Recupera por id */
  async findById(id: number): Promise<Melhoria> {
    return await this.melhoriaRepository.findOne({ where: { id } });
  }

  /* Cria */
  async create(newMelhoria: Melhoria): Promise<Melhoria> {
    const melhoria: Melhoria = await this.melhoriaRepository.create(newMelhoria);
    return await this.melhoriaRepository.save(melhoria);
  }

  /* Atualiza */
  async update(id: number, entity: Melhoria): Promise<Melhoria> {
    const entityDB: Melhoria = await this.findById(id);
    return await (this.melhoriaRepository.save({ ...entityDB, ...entity })) as Melhoria;
  }

  /* Exclui */
  async delete(id: number): Promise<Melhoria> {
    const entityDB: Melhoria = await this.findById(id);
    return (await this.melhoriaRepository.remove(entityDB)) as Melhoria;
  }
}
