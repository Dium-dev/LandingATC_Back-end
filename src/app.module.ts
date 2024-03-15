import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { DatabaseModule } from './database/database.module';
import { AdminUsersModule } from './admin_users/admin_users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ReviewsModule, DatabaseModule, AuthModule, AdminUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
