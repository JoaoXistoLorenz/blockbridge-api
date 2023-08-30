import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlataformaService } from './plataforma.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { Plataforma } from './plataforma.entity';

@Controller('plataforma')
export class PlataformaController {
  constructor(private plataformaService: PlataformaService) {}

  @Get('')
  @SafeResponse()
  public async search(): Promise<Response> {
    const plataformas = await this.plataformaService.search();
    return new Response(plataformas, 'Plataformas Recuperadas');
  }

  @Get(':id')
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const plataforma = await this.plataformaService.findById(parseInt(id));
    return new Response(plataforma, 'Plataforma Recuperada');
  }

  @Get('/menu/:id')
  @SafeResponse()
  public async findByTipoMenu(@Param('id') id: string): Promise<Response> {
    const plataforma = await this.plataformaService.findByTipoMenu(
      parseInt(id),
    );
    return new Response(plataforma, 'Plataforma Recuperada');
  }

  @Get('/menulimit/:id_menu/:id_plataforma')
  @SafeResponse()
  public async findByTipoMenuLimit(
    @Param('id_menu') idMenu: string,
    @Param('id_plataforma') idPlataforma: string,
  ): Promise<Response> {
    const plataforma = await this.plataformaService.findByTipoMenuLimit(
      parseInt(idMenu),
      parseInt(idPlataforma),
    );
    return new Response(plataforma, 'Plataforma Recuperada');
  }

  @Get('/escalabilidade/:id')
  @SafeResponse()
  public async findByTipoEscalabilidade(
    @Param('id') id: string,
  ): Promise<Response> {
    const plataforma = await this.plataformaService.findByTipoEscalabilidade(
      parseInt(id),
    );
    return new Response(plataforma, 'Plataforma Recuperada');
  }

  @Post('/nome')
  @SafeResponse()
  public async findByName(@Body() module: { nome: string }): Promise<Response> {
    return new Response(
      await this.plataformaService.findByNome(module.nome),
      'Plataforma registrada com sucesso',
    );
  }

  /* Filtrar por blockchain */
  /* ========================================================= */

  /* Somente adimin */
  @Post()
  @SafeResponse()
  public async create(@Body() module: Plataforma): Promise<Response> {
    return new Response(
      await this.plataformaService.create(module),
      'Plataforma registrada com sucesso',
    );
  }

  /* Somente admin */
  @Patch(':id')
  @SafeResponse()
  public async update(
    @Param('id') id: string,
    @Body() module: Plataforma,
  ): Promise<Response> {
    return new Response(
      await this.plataformaService.update(parseInt(id), module),
      'Plataforma atualizada com sucesso',
    );
  }

  /* Somente admin */
  @Delete(':id')
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.plataformaService.delete(parseInt(id));
    return new Response({}, 'Plataforma removida com sucesso');
  }
}
