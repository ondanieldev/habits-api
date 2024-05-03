import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateTableUsersRemoveAuthToken1714692904764
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'accessToken');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'accessToken',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
