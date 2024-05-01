import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tables = ['users', 'tasks', 'appointments'];

const fields: TableColumn[] = [
  new TableColumn({
    name: 'isNotificationEnabled',
    type: 'boolean',
    default: false,
  }),
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
];

export class UpdateTablesAddPreferences1714570097038
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of tables) {
      await queryRunner.addColumns(table, fields);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of tables) {
      await queryRunner.dropColumns(
        table,
        fields.map((field) => field.name),
      );
    }
  }
}
