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
import { TipoEscalabilidadeService } from './tipo-escalabilidade.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { TipoEscalabilidade } from './tipo-escalabilidade.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('tipo-escalabilidade')
export class TipoEscalabilidadeController {
  constructor(private tipoEscalabilidadeService: TipoEscalabilidadeService) {}

  @Get('')
  @SafeResponse()
  public async search(): Promise<Response> {
    const tipoEscalabilidades = await this.tipoEscalabilidadeService.search();
    return new Response(tipoEscalabilidades, 'Escalabilidades Recuperados');
  }

  @Get(':id')
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const tipoEscalabilidade = await this.tipoEscalabilidadeService.findById(
      parseInt(id),
    );
    return new Response(tipoEscalabilidade, 'Escalabilidade Recuperado');
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async create(@Body() module: TipoEscalabilidade): Promise<Response> {
    return new Response(
      await this.tipoEscalabilidadeService.create(module),
      'Tipo Escalabilidade registrado com sucesso',
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async update(
    @Param('id') id: string,
    @Body() module: TipoEscalabilidade,
  ): Promise<Response> {
    return new Response(
      await this.tipoEscalabilidadeService.update(parseInt(id), module),
      'Tipo Escalabilidade atualizado com sucesso',
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.tipoEscalabilidadeService.delete(parseInt(id));
    return new Response({}, 'Tipo Escalabilidade removido com sucesso');
  }
}
