import { Review } from '../review.entity'

export class ReviewListResponseDto {
  total: number
  nextCursor: string
  items: Review[]
}
