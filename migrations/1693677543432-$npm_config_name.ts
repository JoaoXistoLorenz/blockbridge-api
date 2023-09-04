import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1693677543432 implements MigrationInterface {
  name = ' $npmConfigName1693677543432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "link" ("id" BIGSERIAL NOT NULL, "tipo" integer NOT NULL, "url" character varying NOT NULL, "imagem" character varying, "bg" character varying, "icone" character varying, "color" character varying, "nome" character varying, "plataformaId" bigint, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_e41b385bce72572f287fc01ac30" FOREIGN KEY ("plataformaId") REFERENCES "plataforma"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_e41b385bce72572f287fc01ac30"`,
    );
    await queryRunner.query(`DROP TABLE "link"`);
  }
}
