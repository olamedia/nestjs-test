import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { reviewProviders } from './review.providers';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewResponseBuilder } from './review.response.builder';
import { ReviewCursor } from './review.cursor.transformer';

@Module({
  controllers: [ReviewController],
  imports: [DatabaseModule],
  providers: [
    ...reviewProviders,
    ReviewService,
    ReviewResponseBuilder,
    ReviewCursor
  ],
  exports: [
    ReviewService,
    ReviewResponseBuilder,
    ReviewCursor
  ]
})
export class ReviewModule {}
