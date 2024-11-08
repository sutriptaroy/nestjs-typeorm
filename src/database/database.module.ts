import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.getOrThrow<string>('MYSQL_HOST'),
                port: +config.getOrThrow<string>('MYSQL_PORT'),
                database: config.getOrThrow<string>('MYSQL_DATABASE'),
                username: config.getOrThrow<string>('MYSQL_USERNAME'),
                password: config.getOrThrow<string>('MYSQL_PASSWORD'),
                autoLoadEntities: true,
                synchronize: (!!config.getOrThrow<string>('MYSQL_SYNCHRONIZE')),
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
