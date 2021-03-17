import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Products1615380443895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'products',
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
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'value',
                    type: 'float',
                    default: 0
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
