/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plataforma } from './plataforma.entity';
import { ILike, Not, Repository } from 'typeorm';

@Injectable()
export class PlataformaService {
  constructor(
    @InjectRepository(Plataforma)
    private plataformaRepository: Repository<Plataforma>,
  ) {}
  
  /* Recupera todos */
  async search(): Promise<Plataforma[]> {
    return await this.plataformaRepository.find();
  }

  /* Recupera por id */
  async findById(id: number): Promise<Plataforma> {
    return await this.plataformaRepository.findOne({ where: { id } });
  }

  /* Recupera por tipo menu */
  async findByTipoMenu(id: number): Promise<Plataforma[]> {
    return await this.plataformaRepository.find({ 
      where: {
        tipoMenu: {id},
      },
    });
  }

  /* Recupera por tipo menu */
  async findByTipoMenuLimit(idMenu: number, idPlataforma: number): Promise<Plataforma[]> {
    return await this.plataformaRepository.find({ 
      where: {
        id: Not(idPlataforma),
        tipoMenu: { id: idMenu},
      },
      take: 6,
    });
  }

  /* Recupera por tipo escalabilidade */
  async findByTipoEscalabilidade(id: number): Promise<Plataforma[]> {
    return await this.plataformaRepository.find({ 
      where: {
        tipoEscalabilidade: {id},
      },
    });
  }

  /* Recupera por nome */
  async findByNome(nome: string): Promise<Plataforma[]> {
    return await this.plataformaRepository.find({ 
      where: {
        nome: ILike(`${nome}`),
      },
    });
  }

  /* Recuperar por blockchain */
  /* ================================================================== */

  /* Cria */
  async create(newPlataforma: Plataforma): Promise<Plataforma> {
    const plataformaInDb = await this.plataformaRepository.findOne({
      where: [{ nome: newPlataforma.nome }],
    });
    if (plataformaInDb) {
      throw new HttpException(`Plataforma já existe!`, HttpStatus.CONFLICT);
    }
    const plataforma: Plataforma = await this.plataformaRepository.create(newPlataforma);
    return await this.plataformaRepository.save(plataforma);
  }

  /* Atualiza */
  async update(id: number, entity: Plataforma): Promise<Plataforma> {
    const plataformaInDb = await this.plataformaRepository.findOne({
      where: [
        {
          id: Not(id),
          nome: entity.nome,
        },
      ],
    });
    if (plataformaInDb) {
      throw new HttpException(`Plataforma já existe!`, HttpStatus.CONFLICT);
    }
    const entityDB: Plataforma = await this.findById(id);
    return await (this.plataformaRepository.save({ ...entityDB, ...entity })) as Plataforma;
  }

  /* Exclui */
  async delete(id: number): Promise<Plataforma> {
    const entityDB: Plataforma = await this.findById(id);
    return (await this.plataformaRepository.remove(entityDB)) as Plataforma;
  }
}
