import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1693538974276 implements MigrationInterface {
  name = ' $npmConfigName1693538974276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plataforma" ADD "urlexp" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "plataforma" ADD "urlcert" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "plataforma" ADD "urlyoutube" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "plataforma" ADD "urldef" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plataforma" DROP COLUMN "urldef"`);
    await queryRunner.query(
      `ALTER TABLE "plataforma" DROP COLUMN "urlyoutube"`,
    );
    await queryRunner.query(`ALTER TABLE "plataforma" DROP COLUMN "urlcert"`);
    await queryRunner.query(`ALTER TABLE "plataforma" DROP COLUMN "urlexp"`);
  }
}
