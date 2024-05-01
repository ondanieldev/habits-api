import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tables = ['users', 'tasks', 'appointments'];

export class UpdateTableTasksAndAppointmentsRemoveVibration1714599746219
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of tables) {
      await queryRunner.dropColumn(table, 'isVibrationEnabled');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of tables) {
      await queryRunner.addColumn(
        table,
        new TableColumn({
          name: 'isVibrationEnabled',
          type: 'boolean',
          default: false,
        }),
      );
    }
  }
}
