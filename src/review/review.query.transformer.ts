import { Injectable } from '@nestjs/common'
import { ReviewListRequestDto } from './dto/review-list-request.dto'
import { ReviewListQuery } from './query/review-list-query'

@Injectable()
export class ReviewQueryTransformer {
  async createListQuery(dto: ReviewListRequestDto): Promise<ReviewListQuery> {
    const query = new ReviewListQuery()
    if (dto.cursor !== undefined) {
      const decodedCursor = Buffer.from(dto.cursor, 'base64').toString('utf8')
      query.id = decodedCursor.split('#')[0]
      query.perPage = parseInt(decodedCursor.split('#')[1], 10)
      query.skip = parseInt(decodedCursor.split('#')[2], 10)
    }
    if (dto.id !== undefined && dto.perPage !== undefined) {
      query.id = dto.id
      query.perPage = dto.perPage
      query.skip = 0
    }
    return query
  }

  async encodeCursor(
    query: ReviewListQuery,
    itemsFound: number,
    total: number,
  ): Promise<string | null> {
    const skip = query.skip + itemsFound
    if (skip >= total) {
      return null
    }
    const cursor = query.id + '#' + query.perPage + '#' + skip
    return Buffer.from(cursor).toString('base64')
  }
}
