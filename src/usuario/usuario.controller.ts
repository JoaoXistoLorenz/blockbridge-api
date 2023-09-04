import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { Usuario } from './usuario.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async search(): Promise<Response> {
    const usuarios = await this.usuarioService.search();
    for (let index = 0; index < usuarios.length; index++) {
      delete usuarios[index].senha;
    }
    return new Response(usuarios, 'Usuarios Recuperadas');
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const usuario = await this.usuarioService.findById(parseInt(id));
    delete usuario.senha;
    return new Response(usuario, 'Usuario Recuperado');
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async create(@Body() module: Usuario): Promise<Response> {
    return new Response(
      await this.usuarioService.create(module),
      'Usuario registrado com sucesso',
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.usuarioService.delete(parseInt(id));
    return new Response({}, 'Usuario removido com sucesso');
  }
}
