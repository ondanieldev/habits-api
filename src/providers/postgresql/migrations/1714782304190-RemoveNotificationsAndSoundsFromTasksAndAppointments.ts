import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tables = ['tasks', 'appointments'];
const fields = ['isNotificationEnabled', 'isSoundEnabled'];

export class RemoveNotificationsAndSoundsFromTasksAndAppointments1714782304190
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of tables) {
      for (const field of fields) {
        await queryRunner.dropColumn(table, field);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of tables) {
      for (const field of fields) {
        await queryRunner.addColumn(
          table,
          new TableColumn({
            name: field,
            type: 'boolean',
            default: false,
          }),
        );
      }
    }
  }
}
