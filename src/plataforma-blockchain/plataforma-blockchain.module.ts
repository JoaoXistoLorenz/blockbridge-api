import { Module } from '@nestjs/common';
import { PlataformaBlockchainService } from './plataforma-blockchain.service';
import { PlataformaBlockchainController } from './plataforma-blockchain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlataformaBlockchain } from './plataforma-blockchain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlataformaBlockchain])],
  providers: [PlataformaBlockchainService],
  exports: [PlataformaBlockchainService],
  controllers: [PlataformaBlockchainController],
})
export class PlataformaBlockchainModule {}
