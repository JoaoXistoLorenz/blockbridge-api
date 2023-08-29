/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoMenu } from './tipo-menu.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class TipoMenuService {
  constructor(
    @InjectRepository(TipoMenu)
    private tipoMenuRepository: Repository<TipoMenu>,
  ) {}
  
  /* Recupera todos */
  async search(): Promise<TipoMenu[]> {
    return await this.tipoMenuRepository.find();
  }

  /* Recupera por id */
  async findById(id: number): Promise<TipoMenu> {
    return await this.tipoMenuRepository.findOne({ where: { id } });
  }

  /* Recupera ultimo registro */
  private async findLast(): Promise<TipoMenu> {
    return await this.tipoMenuRepository.findOne({ order: {
      id: 'DESC',
    } });
  }

  /* Cria */
  async create(newTipoMenu: TipoMenu): Promise<TipoMenu> {
    const tipoMenuInDb = await this.tipoMenuRepository.findOne({
      where: [{ nome: newTipoMenu.nome }],
    });
    if (tipoMenuInDb) {
      throw new HttpException(`Tipo Menu já existe!`, HttpStatus.CONFLICT);
    }
    const lastTipo = await this.findLast();
    if (lastTipo.id) {
      newTipoMenu.id = parseInt(lastTipo.id.toString()) + 1;
    }
    const tipoMenu: TipoMenu = await this.tipoMenuRepository.create(newTipoMenu);
    return await this.tipoMenuRepository.save(tipoMenu);
  }

  /* Atualiza */
  async update(id: number, entity: TipoMenu): Promise<TipoMenu> {
    const tipoMenuInDb = await this.tipoMenuRepository.findOne({
      where: [
        {
          id: Not(id),
          nome: entity.nome,
        },
      ],
    });
    if (tipoMenuInDb) {
      throw new HttpException(`Tipo Menu já existe!`, HttpStatus.CONFLICT);
    }
    const entityDB: TipoMenu = await this.findById(id);
    return await (this.tipoMenuRepository.save({ ...entityDB, ...entity })) as TipoMenu;
  }

  /* Exclui */
  async delete(id: number): Promise<TipoMenu> {
    const entityDB: TipoMenu = await this.findById(id);
    return (await this.tipoMenuRepository.remove(entityDB)) as TipoMenu;
  }
}
