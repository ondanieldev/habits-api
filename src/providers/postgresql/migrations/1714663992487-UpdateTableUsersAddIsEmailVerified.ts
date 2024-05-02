import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateTableUsersAddIsEmailVerified1714663992487
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'isEmailVerified',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'verifyEmailToken',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'verifyEmailTokenExpiresAt',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'verifyEmailTokenExpiresAt');
    await queryRunner.dropColumn('users', 'verifyEmailToken');
    await queryRunner.dropColumn('users', 'isEmailVerified');
  }
}
