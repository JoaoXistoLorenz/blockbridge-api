/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}
  
  /* Recupera todos */
  async search(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({ select: ['login'] });
  }

  /* Recupera por id */
  async findById(id: number): Promise<Usuario> {
    return await this.usuarioRepository.findOne({ where: { id } });
  }

  async findByLogin(login: string): Promise<Usuario> {
    return await this.usuarioRepository.findOne({ where: { login } });
  }

  /* Cria */
  async create(newUsuario: Usuario): Promise<Usuario> {
    const usuarioInDb = await this.usuarioRepository.findOne({
      where: [{ login: newUsuario.login }],
    });
    if (usuarioInDb) {
      throw new HttpException(`Usuário já existe!`, HttpStatus.CONFLICT);
    }
    const usuario: Usuario = await this.usuarioRepository.create(newUsuario);
    const ret = await this.usuarioRepository.save(usuario);
    delete ret.senha;
    return ret;
  }

  /* Atualiza */
  async update(id: number, entity: Usuario): Promise<Usuario> {
    const usuarioInDb = await this.usuarioRepository.findOne({
      where: [
        {
          id: Not(id),
          login: entity.login,
        },
      ],
    });
    if (usuarioInDb) {
      throw new HttpException(`Usuário já existe!`, HttpStatus.CONFLICT);
    }
    const entityDB: Usuario = await this.findById(id);
    const ret = await (this.usuarioRepository.save({ ...entityDB, ...entity })) as Usuario;
    delete ret.senha;
    return ret;
  }

  /* Exclui */
  async delete(id: number): Promise<Usuario> {
    const entityDB: Usuario = await this.findById(id);
    return (await this.usuarioRepository.remove(entityDB)) as Usuario;
  }
}
