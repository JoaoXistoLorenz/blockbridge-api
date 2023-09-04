/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { Blockchain } from './src/blockchain/blockchain.entity';
import { Melhoria } from './src/melhoria/melhoria.entity';
import { Plataforma } from './src/plataforma/plataforma.entity';
import { TipoEscalabilidade } from './src/tipo-escalabilidade/tipo-escalabilidade.entity';
import { TipoMenu } from './src/tipo-menu/tipo-menu.entity';
import { Usuario } from './src/usuario/usuario.entity';
import { Link } from './src/link/link.entity';
import { PlataformaBlockchain } from './src/plataforma-blockchain/plataforma-blockchain.entity';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'projeto',
  synchronize: true,
  entities: [Blockchain, Melhoria, Plataforma, TipoEscalabilidade, TipoMenu, Usuario, PlataformaBlockchain, Link],
  migrations: ['migrations/*.ts'],
} as DataSourceOptions);
