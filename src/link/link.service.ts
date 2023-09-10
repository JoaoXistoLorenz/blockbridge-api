/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}
  
  /* Recupera todos */
  async search(): Promise<Link[]> {
    return await this.linkRepository.find();
  }

  /* Recupera por id */
  async findById(id: number): Promise<Link> {
    return await this.linkRepository.findOne({ where: { id }, relations: ['plataforma'] });
  }

  /* Recupera por tipo */
  async findByTipo(tipo: number): Promise<Link> {
    return await this.linkRepository.findOne({ where: { tipo } });
  }

  /* Recupera por plataforma */
  async findByPlataforma(plataforma: number): Promise<Link> {
    return await this.linkRepository.findOne({ where: { plataforma: { id: plataforma} } });
  }

  /* Cria */
  async create(newLink: Link): Promise<Link> {
    const link: Link = await this.linkRepository.create(newLink);
    return await this.linkRepository.save(link);
  }

  /* Atualiza */
  async update(id: number, entity: Link): Promise<Link> {
    const entityDB: Link = await this.findById(id);
    return await (this.linkRepository.save({ ...entityDB, ...entity })) as Link;
  }

  /* Exclui */
  async delete(id: number): Promise<Link> {
    const entityDB: Link = await this.findById(id);
    return (await this.linkRepository.remove(entityDB)) as Link;
  }

  /* Exclui links nulos */
  async deleteNull(): Promise<void> {
    await this.linkRepository
      .createQueryBuilder()
      .delete()
      .from(Link)
      .where("plataforma IS NULL")
      .execute();
  }
}
