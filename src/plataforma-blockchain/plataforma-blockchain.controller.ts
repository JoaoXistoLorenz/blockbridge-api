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
import { PlataformaBlockchainService } from './plataforma-blockchain.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { PlataformaBlockchain } from './plataforma-blockchain.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('plataforma-blockchain')
export class PlataformaBlockchainController {
  constructor(
    private plataformaBlockchainService: PlataformaBlockchainService,
  ) {}

  @Get('')
  @SafeResponse()
  public async search(): Promise<Response> {
    const plataformaBlockchains =
      await this.plataformaBlockchainService.search();
    return new Response(
      plataformaBlockchains,
      'Plataforma Blockchains Recuperados',
    );
  }

  @Get(':id')
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const plataformaBlockchain =
      await this.plataformaBlockchainService.findById(parseInt(id));
    return new Response(
      plataformaBlockchain,
      'Plataforma Blockchain Recuperado',
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async create(@Body() module: PlataformaBlockchain): Promise<Response> {
    return new Response(
      await this.plataformaBlockchainService.create(module),
      'Plataforma Blockchain registrado com sucesso',
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async update(
    @Param('id') id: string,
    @Body() module: PlataformaBlockchain,
  ): Promise<Response> {
    return new Response(
      await this.plataformaBlockchainService.update(parseInt(id), module),
      'Plataforma Blockchain atualizado com sucesso',
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.plataformaBlockchainService.delete(parseInt(id));
    return new Response({}, 'Plataforma Blockchain removido com sucesso');
  }
}
