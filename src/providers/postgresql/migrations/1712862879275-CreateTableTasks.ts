import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableTasks1712862879275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'kind',
            type: 'enum',
            enum: ['habit', 'reminder'],
            enumName: 'taskseeds_kind_enum',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'hours',
            type: 'int',
          },
          {
            name: 'minutes',
            type: 'int',
          },
          {
            name: 'daysOfWeek',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_tasks_userId_users_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tasks', 'FK_tasks_userId_users_id');
    await queryRunner.dropTable('tasks');
  }
}
