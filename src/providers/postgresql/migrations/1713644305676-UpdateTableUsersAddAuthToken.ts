import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateTableUsersAddAuthToken1713644305676
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'accessToken',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['accessToken']);
  }
}
