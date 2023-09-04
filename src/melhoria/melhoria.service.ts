/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Melhoria } from './melhoria.entity';
import { Between, Repository } from 'typeorm';

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

  datatimeFormat(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /* Cria */
  async create(newMelhoria: Melhoria): Promise<Melhoria> {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
    const elements: Melhoria[] = await this.melhoriaRepository.find({
      where: {
        ip: newMelhoria.ip,
        data: Between(this.datatimeFormat(startOfDay), this.datatimeFormat(endOfDay)),
      }
    })
    if (elements.length > 15) {
      throw new HttpException(`Muitas solicitações enviadas no dia!`, HttpStatus.CONFLICT);
    }
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
