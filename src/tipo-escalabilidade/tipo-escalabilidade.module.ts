import { Module } from '@nestjs/common';
import { TipoEscalabilidadeService } from './tipo-escalabilidade.service';
import { TipoEscalabilidadeController } from './tipo-escalabilidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEscalabilidade } from './tipo-escalabilidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEscalabilidade])],
  providers: [TipoEscalabilidadeService],
  exports: [TipoEscalabilidadeService],
  controllers: [TipoEscalabilidadeController],
})
export class TipoEscalabilidadeModule {}
