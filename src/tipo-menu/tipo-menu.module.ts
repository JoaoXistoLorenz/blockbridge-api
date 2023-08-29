import { Module } from '@nestjs/common';
import { TipoMenuService } from './tipo-menu.service';
import { TipoMenuController } from './tipo-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMenu } from './tipo-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoMenu])],
  providers: [TipoMenuService],
  exports: [TipoMenuService],
  controllers: [TipoMenuController],
})
export class TipoMenuModule {}
