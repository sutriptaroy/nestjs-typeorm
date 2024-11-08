import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class PublicItems1731088311850 implements MigrationInterface {

    private readonly logger = new Logger(PublicItems1731088311850.name)

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('up')
        await queryRunner.query('UPDATE item SET public = 0')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('down')
    }
}
