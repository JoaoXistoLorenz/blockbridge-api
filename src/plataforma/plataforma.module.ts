import { Module } from '@nestjs/common';
import { PlataformaService } from './plataforma.service';
import { PlataformaController } from './plataforma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plataforma } from './plataforma.entity';
import { PlataformaBlockchainModule } from 'src/plataforma-blockchain/plataforma-blockchain.module';
import { LinkModule } from 'src/link/link.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plataforma]),
    PlataformaBlockchainModule,
    LinkModule,
  ],
  providers: [PlataformaService],
  exports: [PlataformaService],
  controllers: [PlataformaController],
})
export class PlataformaModule {}
