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
import { LinkService } from './link.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { Link } from './link.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get('')
  @SafeResponse()
  public async search(): Promise<Response> {
    const links = await this.linkService.search();
    return new Response(links, 'Links Recuperadas');
  }

  @Get(':id')
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const link = await this.linkService.findById(parseInt(id));
    return new Response(link, 'Link Recuperado');
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async create(@Body() module: Link): Promise<Response> {
    return new Response(
      await this.linkService.create(module),
      'Link registrado com sucesso',
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async update(
    @Param('id') id: string,
    @Body() module: Link,
  ): Promise<Response> {
    return new Response(
      await this.linkService.update(parseInt(id), module),
      'Link atualizado com sucesso',
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.linkService.delete(parseInt(id));
    return new Response({}, 'Link removido com sucesso');
  }
}
