import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { ReviewQueryTransformer } from './review.query.transformer'
import { ReviewListQuery } from './query/review-list-query'
import { Review } from './review.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [ReviewController],
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewService, ReviewListQuery, ReviewQueryTransformer],
  exports: [ReviewService, ReviewListQuery, ReviewQueryTransformer],
})
export class ReviewModule {}
