import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from 'src/reviews/entities/review.entity';

@Module({
    imports: [SequelizeModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            dialect: 'postgres',
            host: configService.get('SQL_HOST'),
            port: configService.get('SQL_PORT'),
            username: configService.get('SQL_USERNAME'),
            password: configService.get('SQL_PASSWORD'),
            database: configService.get('SQL_DATABASE'),
            autoLoadModels: true,
            synchronize: true,
            logging: false,
            models: [Review],
            sync: { force: false, alter: false }
        }),
    })],
    exports: [SequelizeModule],
})
export class DatabaseModule { }
