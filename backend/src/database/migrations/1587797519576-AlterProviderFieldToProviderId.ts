import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table} from "typeorm";
import { query } from "express";
/**
 * @description Migration de AlterProviderFieldToProvider
 */
export default class AlterProviderFieldToProviderId1587797519576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true,
    }),
    );

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName:  'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'AppointmentProvider');

    await queryRunner.addColumn('appointment', new TableColumn({
      name: 'provider',
      type: 'varchar',
    }),
    );
  }
}
