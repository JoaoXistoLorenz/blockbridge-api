import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { Response } from '../configs/response.config';
import { SafeResponse } from 'src/configs/utils.config';
import { Blockchain } from './blockchain.entity';

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

  /* Somente admin */
  @Post()
  @SafeResponse()
  public async create(@Body() module: Blockchain): Promise<Response> {
    return new Response(
      await this.blockchainService.create(module),
      'Blockchain registrada com sucesso',
    );
  }

  /* Somente admin */
  @Patch(':id')
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

  /* Somente admin */
  @Delete(':id')
  @SafeResponse()
  public async delete(@Param('id') id: string): Promise<Response> {
    await this.blockchainService.delete(parseInt(id));
    return new Response({}, 'Blockchain removida com sucesso');
  }
}
