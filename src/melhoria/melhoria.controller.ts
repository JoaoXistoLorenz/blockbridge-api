import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MelhoriaService } from './melhoria.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { Melhoria } from './melhoria.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('melhoria')
export class MelhoriaController {
  constructor(private melhoriaService: MelhoriaService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async search(): Promise<Response> {
    const melhorias = await this.melhoriaService.search();
    return new Response(melhorias, 'Melhorias Recuperadas');
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const melhoria = await this.melhoriaService.findById(parseInt(id));
    return new Response(melhoria, 'Melhoria Recuperada');
  }

  @Post()
  @SafeResponse()
  public async create(
    @Body() module: Melhoria,
    @Ip() ip: any,
  ): Promise<Response> {
    module.ip = ip;
    return new Response(
      await this.melhoriaService.create(module),
      'Melhoria registrada com sucesso',
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async update(
    @Param('id') id: string,
    @Body() module: Melhoria,
  ): Promise<Response> {
    return new Response(
      await this.melhoriaService.update(parseInt(id), module),
      'Melhoria atualizada com sucesso',
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.melhoriaService.delete(parseInt(id));
    return new Response({}, 'Melhoria removida com sucesso');
  }
}
