import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PruductInventory1615391511916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_inventory',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'amount',
                    type: 'int',
                    unsigned: true,
                    default: 0
                },
                {
                    name: 'product',
                    type: 'bigint',
                    unsigned: true,
                    isUnique: true
                }
            ],

            foreignKeys: [
                {
                    columnNames: ['product'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_inventory');
    }

}
