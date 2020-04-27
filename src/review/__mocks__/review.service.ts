import { Injectable } from '@nestjs/common'
import { Review } from '../review.entity'
import { ReviewCreateRequestDto } from '../dto/review-create-request.dto'
import { ReviewListQuery } from '../query/review-list-query'

@Injectable()
export class ReviewService {
  async findAll(): Promise<Review[]> {
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAllPaged(_query: ReviewListQuery) {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_reviewDto: ReviewCreateRequestDto): Promise<Review> {
    return undefined
  }
}
