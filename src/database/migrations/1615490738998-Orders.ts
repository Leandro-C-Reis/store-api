import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Orders1615490738998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                {
                    name: "id",
                    type: "bigint",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'user_id',
                    type: 'bigint',
                    unsigned: true
                },
                {
                    name: 'total_value',
                    type: 'float',
                    unsigned: true
                },
                {
                    name: 'address_id',
                    type: 'bigint',
                    unsigned: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true
                }
            ],

            foreignKeys: [
                {
                    columnNames: ['address_id'],
                    referencedTableName: 'addresses',
                    referencedColumnNames: ['id'],
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
                {
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }

}
