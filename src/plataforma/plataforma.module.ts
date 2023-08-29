import { Module } from '@nestjs/common';
import { PlataformaService } from './plataforma.service';
import { PlataformaController } from './plataforma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plataforma } from './plataforma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plataforma])],
  providers: [PlataformaService],
  exports: [PlataformaService],
  controllers: [PlataformaController],
})
export class PlataformaModule {}
