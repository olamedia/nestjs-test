import { Injectable } from '@nestjs/common'

@Injectable()
export class ReviewListQuery {
  id: string
  perPage: number
  skip: number
}
