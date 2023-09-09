import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1694226309877 implements MigrationInterface {
  name = ' $npmConfigName1694226309877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plataforma_blockchain" ADD CONSTRAINT "FK_24264ef4cc9aa5d7fa32461cb36" FOREIGN KEY ("idPlataformaId") REFERENCES "plataforma"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plataforma_blockchain" DROP CONSTRAINT "FK_24264ef4cc9aa5d7fa32461cb36"`,
    );
  }
}
