import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Tags1617732702324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tags',
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
                    name: 'tag',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'product_id',
                    type: 'bigint',
                    unsigned: true,
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
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['product_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'products',
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tags');
    }

}
