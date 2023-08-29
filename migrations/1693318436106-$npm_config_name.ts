import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1693318436106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (1,'Ethereum', 'ETH', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (2,'Cronos', 'CRO', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (3,'Fantom', 'FTM', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (4,'Cosmos', 'ATOM', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (5,'Polkadot', 'DOT', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (6,'Polygon', 'MATIC', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (7,'Optimistic', 'OP', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (8,'Arbitrum', 'ARBI', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (9,'Solana', 'SOL', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (10,'BNB', 'BNB', '', '', '')`,
    );
    await queryRunner.query(
      `INSERT INTO blockchain ("id", "nome", "sigla", "descricao", "url", "imagem") VALUES (11,'Avalanche', 'AVAX', '', '', '')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM blockchain`);
  }
}
