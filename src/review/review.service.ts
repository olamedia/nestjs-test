import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Review } from './review.entity'
import { ReviewCreateRequestDto } from './dto/review-create-request.dto'
import { ReviewListQuery } from './query/review-list-query'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find()
  }

  async findAllPaged(query: ReviewListQuery) {
    console.log(query)
    return this.reviewRepository
      .createQueryBuilder('review')
      .where('review.to = :to', {
        to: query.id,
      })
      .addOrderBy('id', 'ASC')
      .take(query.perPage)
      .skip(query.skip)
      .getManyAndCount()
  }

  async create(reviewDto: ReviewCreateRequestDto): Promise<Review> {
    const reviewRepository = this.reviewRepository
    const reviewConnection = this.reviewRepository.manager.connection

    return await reviewConnection.transaction(
      async (transactionalEntityManager) => {
        // const reviewCount: number = await reviewRepository.count({
        //   to: reviewDto.to,
        // })

        const lastReview: Review = await reviewRepository.findOne({
          where: {
            to: reviewDto.to,
          },
          order: {
            id: 'DESC',
          },
        })

        const lastIncrement = parseInt(
          lastReview.id.split('#')[1].replace(/^[0]+/, ''),
          10,
        )

        const review = transactionalEntityManager.create(Review)
        review.from = reviewDto.from
        review.to = reviewDto.to
        review.reason = reviewDto.reason
        review.id =
          review.to + '#' + (lastIncrement + 1).toString().padStart(6, '0')

        await transactionalEntityManager.save(review)

        return review
      },
    )
  }
}
