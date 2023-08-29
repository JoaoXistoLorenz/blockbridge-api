import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  /* somente admin */
  @Get('')
  @SafeResponse()
  public async search(): Promise<Response> {
    const usuarios = await this.usuarioService.search();
    for (let index = 0; index < usuarios.length; index++) {
      delete usuarios[index].senha;
    }
    return new Response(usuarios, 'Usuarios Recuperadas');
  }

  /* somente admin */
  @Get(':id')
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const usuario = await this.usuarioService.findById(parseInt(id));
    delete usuario.senha;
    return new Response(usuario, 'Usuario Recuperado');
  }

  @Post('/login')
  @SafeResponse()
  public async login(
    @Body() module: { login: string; senha: string },
  ): Promise<Response> {
    return new Response(
      await this.usuarioService.login(module),
      'Usuario registrado com sucesso',
    );
  }

  /* somente admin */
  @Post()
  @SafeResponse()
  public async create(@Body() module: Usuario): Promise<Response> {
    return new Response(
      await this.usuarioService.create(module),
      'Usuario registrado com sucesso',
    );
  }

  /* Somente admin */
  @Patch(':id')
  @SafeResponse()
  public async update(
    @Param('id') id: string,
    @Body() module: Usuario,
  ): Promise<Response> {
    return new Response(
      await this.usuarioService.update(parseInt(id), module),
      'Usuario atualizado com sucesso',
    );
  }

  /* Somente admin */
  @Delete(':id')
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.usuarioService.delete(parseInt(id));
    return new Response({}, 'Usuario removido com sucesso');
  }
}
