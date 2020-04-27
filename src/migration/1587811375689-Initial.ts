import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Initial1587811375689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    //await queryRunner.createDatabase('test', true)
    await queryRunner.createTable(
      new Table({
        name: 'review',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '23',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'from',
            type: 'varchar',
            length: '16',
            isNullable: true,
          },
          {
            name: 'to',
            type: 'varchar',
            length: '16',
            isNullable: false,
          },
          {
            name: 'reason',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('review')
    //await queryRunner.dropDatabase('test')
  }
}
