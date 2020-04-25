import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { reviewProviders } from './review.providers';
import { ReviewService } from './review.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...reviewProviders,
    ReviewService,
  ],
})
export class ReviewModule {}
