import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1695322473137 implements MigrationInterface {
  name = ' $npmConfigName1695322473137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plataforma" ADD "idcoinmarketcap" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plataforma" DROP COLUMN "idcoinmarketcap"`,
    );
  }
}
