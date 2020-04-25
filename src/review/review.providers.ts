import { Connection } from 'typeorm';
import { Review } from './review.entity';

export const reviewProviders = [
  {
    provide: 'REVIEW_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Review),
    inject: ['DATABASE_CONNECTION'],
  },
];
