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
import { BlockchainService } from './blockchain.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { Blockchain } from './blockchain.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('blockchain')
export class BlockchainController {
  constructor(private blockchainService: BlockchainService) {}

  @Get('')
  @SafeResponse()
  public async search(): Promise<Response> {
    const blockchains = await this.blockchainService.search();
    return new Response(blockchains, 'Blockchains Recuperadas');
  }

  @Get(':id')
  @SafeResponse()
  public async findById(@Param('id') id: string): Promise<Response> {
    const blockchain = await this.blockchainService.findById(parseInt(id));
    return new Response(blockchain, 'Blockchain Recuperada');
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async create(@Body() module: Blockchain): Promise<Response> {
    return new Response(
      await this.blockchainService.create(module),
      'Blockchain registrada com sucesso',
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async update(
    @Param('id') id: string,
    @Body() module: Blockchain,
  ): Promise<Response> {
    return new Response(
      await this.blockchainService.update(parseInt(id), module),
      'Blockchain atualizada com sucesso',
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.blockchainService.delete(parseInt(id));
    return new Response({}, 'Blockchain removida com sucesso');
  }
}
