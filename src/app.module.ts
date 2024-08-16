import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { DatabaseModule } from './database/database.module';
import { AdminUsersModule } from './admin_users/admin_users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ReviewsModule,
    DatabaseModule,
    AuthModule,
    AdminUsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
