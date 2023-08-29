/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoEscalabilidade } from './tipo-escalabilidade.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class TipoEscalabilidadeService {
  constructor(
    @InjectRepository(TipoEscalabilidade)
    private tipoEscalabilidadeRepository: Repository<TipoEscalabilidade>,
  ) {}
  
  /* Recupera todos */
  async search(): Promise<TipoEscalabilidade[]> {
    return await this.tipoEscalabilidadeRepository.find();
  }

  /* Recupera por id */
  async findById(id: number): Promise<TipoEscalabilidade> {
    return await this.tipoEscalabilidadeRepository.findOne({ where: { id } });
  }

  /* Recupera ultimo registro */
  private async findLast(): Promise<TipoEscalabilidade> {
    return await this.tipoEscalabilidadeRepository.findOne({ order: {
      id: 'DESC',
    } });
  }

  /* Cria */
  async create(newTipoEscalabilidade: TipoEscalabilidade): Promise<TipoEscalabilidade> {
    const tipoEscalabilidadeInDb = await this.tipoEscalabilidadeRepository.findOne({
      where: [{ nome: newTipoEscalabilidade.nome }],
    });
    if (tipoEscalabilidadeInDb) {
      throw new HttpException(`Tipo Escalabilidade já existe!`, HttpStatus.CONFLICT);
    }
    const lastTipo = await this.findLast();
    if (lastTipo.id) {
      newTipoEscalabilidade.id = parseInt(lastTipo.id.toString()) + 1;
    }
    const tipoEscalabilidade: TipoEscalabilidade = await this.tipoEscalabilidadeRepository.create(newTipoEscalabilidade);
    return await this.tipoEscalabilidadeRepository.save(tipoEscalabilidade);
  }

  /* Atualiza */
  async update(id: number, entity: TipoEscalabilidade): Promise<TipoEscalabilidade> {
    const tipoEscalabilidadeInDb = await this.tipoEscalabilidadeRepository.findOne({
      where: [
        {
          id: Not(id),
          nome: entity.nome,
        },
      ],
    });
    if (tipoEscalabilidadeInDb) {
      throw new HttpException(`Tipo Escalabilidade já existe!`, HttpStatus.CONFLICT);
    }
    const entityDB: TipoEscalabilidade = await this.findById(id);
    return await (this.tipoEscalabilidadeRepository.save({ ...entityDB, ...entity })) as TipoEscalabilidade;
  }

  /* Exclui */
  async delete(id: number): Promise<TipoEscalabilidade> {
    const entityDB: TipoEscalabilidade = await this.findById(id);
    return (await this.tipoEscalabilidadeRepository.remove(entityDB)) as TipoEscalabilidade;
  }
}
