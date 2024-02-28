import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ReviewsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
