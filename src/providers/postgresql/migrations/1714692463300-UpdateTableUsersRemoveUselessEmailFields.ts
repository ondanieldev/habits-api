import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateTableUsersRemoveUselessEmailFields1714692463300
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      'verifyEmailToken',
      'verifyEmailTokenExpiresAt',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
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

    await queryRunner.dropColumns('users', [
      'resetPasswordToken',
      'resetPasswordTokenExpiresAt',
    ]);
  }
}
