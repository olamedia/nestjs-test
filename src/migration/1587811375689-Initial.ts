import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1587811375689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createDatabase('test', true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropDatabase('test')
    }

}
