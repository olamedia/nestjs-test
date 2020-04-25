import { Injectable } from '@nestjs/common';
import { Review } from './review.entity';
import { ReviewListResponseDto } from './dto/list-response.dto';

@Injectable()
export class ReviewResponseBuilder{
  async listResponse(total: number, cursor: string, items: Review[]): Promise<ReviewListResponseDto>{
    return Object.assign(new ReviewListResponseDto(), {
      total,
      cursor,
      items
    });
  }
}
