import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class PublicItems1731089670258 implements MigrationInterface {

    private readonly logger = new Logger(PublicItems1731089670258.name)

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('up')
        await queryRunner.query('UPDATE item SET name = "Item 2" WHERE id = 4 ')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('down')
    }
}
