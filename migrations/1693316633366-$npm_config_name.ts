/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class  $npmConfigName1693316633366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO tipo_menu ("id", "nome") VALUES (1,'Escalabilidade')`);
      await queryRunner.query(`INSERT INTO tipo_menu ("id", "nome") VALUES (2,'DEXs')`);
      await queryRunner.query(`INSERT INTO tipo_menu ("id", "nome") VALUES (3,'Lending')`);
      await queryRunner.query(`INSERT INTO tipo_menu ("id", "nome") VALUES (4,'Liquid Staking')`);
      await queryRunner.query(`INSERT INTO tipo_menu ("id", "nome") VALUES (5,'NFTs')`);

      await queryRunner.query(`INSERT INTO tipo_escalabilidade ("id", "nome") VALUES (1,'Ponte')`);
      await queryRunner.query(`INSERT INTO tipo_escalabilidade ("id", "nome") VALUES (2,'Sidechain')`);
      await queryRunner.query(`INSERT INTO tipo_escalabilidade ("id", "nome") VALUES (3,'Rollup Otimista')`);
      await queryRunner.query(`INSERT INTO tipo_escalabilidade ("id", "nome") VALUES (4,'Rollup ZK')`);
      await queryRunner.query(`INSERT INTO tipo_escalabilidade ("id", "nome") VALUES (5,'Validium')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DELETE * FROM tipo_menu`);
      await queryRunner.query(`DELETE * FROM tipo_escalabilidade`);
    }

}
