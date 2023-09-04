import { Module } from '@nestjs/common';
import { typeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainModule } from './blockchain/blockchain.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MelhoriaModule } from './melhoria/melhoria.module';
import { TipoMenuModule } from './tipo-menu/tipo-menu.module';
import { TipoEscalabilidadeModule } from './tipo-escalabilidade/tipo-escalabilidade.module';
import { PlataformaModule } from './plataforma/plataforma.module';
import { PlataformaBlockchainModule } from './plataforma-blockchain/plataforma-blockchain.module';
import { LinkModule } from './link/link.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BlockchainModule,
    UsuarioModule,
    MelhoriaModule,
    TipoMenuModule,
    TipoEscalabilidadeModule,
    PlataformaModule,
    PlataformaBlockchainModule,
    LinkModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
