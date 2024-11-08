import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { ConfigService } from "@nestjs/config";
// import { Item } from "src/items/entities/item.entity";
// import { Listing } from "src/items/entities/listing.entity";
// import { Comment } from "src/items/entities/comment.entity";
// import { Tag } from "src/items/entities/tag.entity";

dotenv.config()

const configService = new ConfigService()

export default new DataSource({
    type: 'mysql',
    host: configService.getOrThrow<string>('MYSQL_HOST'),
    port: +configService.getOrThrow<string>('MYSQL_PORT'),
    database: configService.getOrThrow<string>('MYSQL_DATABASE'),
    username: configService.getOrThrow<string>('MYSQL_USERNAME'),
    password: configService.getOrThrow<string>('MYSQL_PASSWORD'),
    migrations: ['migrations/**'],
    // entities: [Item, Listing, Comment, Tag],
    entities: [__dirname + 'src/items/entities/*.entity{.ts,.js}'],
    // synchronize: false
})
