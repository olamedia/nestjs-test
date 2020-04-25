import { Review } from '../review.entity';

export class ReviewListResponseDto {
  total: number;
  cursor: string;
  items: Review[];
}
