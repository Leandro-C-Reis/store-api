import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ProductsOrders1615571816338 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products_orders',
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
                    name: 'product_id',
                    type: 'bigint',
                    unsigned: true
                },
                {
                    name: 'order_id',
                    type: 'bigint',
                    unsigned: true
                },
                {
                    name:  'amount',
                    type: 'int',
                    unsigned: true
                }
            ],

            foreignKeys: [
                {
                    columnNames: ['product_id'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
                {
                    columnNames: ['order_id'],
                    referencedTableName: 'orders',
                    referencedColumnNames: ['id'],
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
