import { Module } from '@nestjs/common';
import { MelhoriaService } from './melhoria.service';
import { MelhoriaController } from './melhoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Melhoria } from './melhoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Melhoria])],
  providers: [MelhoriaService],
  exports: [MelhoriaService],
  controllers: [MelhoriaController],
})
export class MelhoriaModule {}
