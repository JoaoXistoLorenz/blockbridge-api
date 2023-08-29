import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TipoMenuService } from './tipo-menu.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { TipoMenu } from './tipo-menu.entity';

@Controller('tipo-menu')
export class TipoMenuController {
  constructor(private tipoMenuService: TipoMenuService) {}

  @Get('')
  @SafeResponse()
  public async search(): Promise<Response> {
    const tipoMenus = await this.tipoMenuService.search();
    return new Response(tipoMenus, 'Menus Recuperados');
  }

  @Get(':id')
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const tipoMenu = await this.tipoMenuService.findById(parseInt(id));
    return new Response(tipoMenu, 'Menu Recuperado');
  }

  /* Somente admin */
  @Post()
  @SafeResponse()
  public async create(@Body() module: TipoMenu): Promise<Response> {
    return new Response(
      await this.tipoMenuService.create(module),
      'Tipo Menu registrado com sucesso',
    );
  }

  /* Somente admin */
  @Patch(':id')
  @SafeResponse()
  public async update(
    @Param('id') id: string,
    @Body() module: TipoMenu,
  ): Promise<Response> {
    return new Response(
      await this.tipoMenuService.update(parseInt(id), module),
      'Tipo Menu atualizado com sucesso',
    );
  }

  /* Somente admin */
  @Delete(':id')
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.tipoMenuService.delete(parseInt(id));
    return new Response({}, 'Tipo Menu removido com sucesso');
  }
}
