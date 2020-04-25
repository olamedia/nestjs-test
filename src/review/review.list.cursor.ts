import { Injectable } from '@nestjs/common';
import { ListRequestDto } from './dto/list-request.dto';
import { Review } from './review.entity';

@Injectable()
export class ReviewListCursor{

  id: string;
  prevId: string;
  perPage: number;

  static async create(data: ListRequestDto): Promise<ReviewListCursor> {
    const cursor = new ReviewListCursor();
    Object.assign(cursor, data);
    return cursor;
  }

  static async fromEncoded(encodedCursor: string): Promise<ReviewListCursor>{
    const decodedParts = Buffer.from(encodedCursor, 'base64').toString('utf8').split('#');
    const decodedCursor = new ReviewListCursor();

    decodedCursor.id = decodedParts[0];
    decodedCursor.prevId = decodedCursor.id + '#' + parseInt(decodedParts[1], 10);
    decodedCursor.perPage = parseInt(decodedParts[2], 10);

    return decodedCursor;
  }

  async toEncoded(): Promise<string>{
    const cursor = this.prevId + '#' + this.perPage;
    return Buffer.from(cursor).toString('base64');
  }

  async extractQuery(query: ListRequestDto, cursor: string): Promise<number> {
    const decodedCursor = Buffer.from(cursor, 'base64').toString('utf8');
    query.id = decodedCursor.split('#')[0];
    const prev = parseInt(decodedCursor.split('#')[0], 10);
    query.perPage = parseInt(decodedCursor.split('#')[2], 10);
    return prev;
  }

  async createNextCursor(query: ListRequestDto, items: Review[]): Promise<string>{
    const lastItem = items[items.length - 1];
    const cursor: string = lastItem.id + '#' + query.perPage;
    return Buffer.from(cursor).toString('base64');
  }
}
