import { Injectable } from '@nestjs/common'

@Injectable()
export class ReviewListQuery {
  id: string
  perPage: number
  skip: number

  async toEncoded(): Promise<string> {
    const cursor = this.id + '#' + this.skip + '#' + this.perPage
    return Buffer.from(cursor).toString('base64')
  }
}
