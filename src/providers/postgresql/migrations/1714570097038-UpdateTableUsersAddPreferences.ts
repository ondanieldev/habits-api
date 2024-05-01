import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateTableUsersAddPreferences1714570097038
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'isSoundEnabled',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'isVibrationEnabled',
        type: 'boolean',
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isSoundEnabled');
    await queryRunner.dropColumn('users', 'isVibrationEnabled');
  }
}
