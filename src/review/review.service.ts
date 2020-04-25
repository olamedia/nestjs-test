import { Inject, Injectable } from '@nestjs/common';
import { Repository, Transaction, TransactionManager, TransactionRepository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findAllFirstPage(to: string, perPage: number): Promise<[Review[], number]> {
    return this.reviewRepository.createQueryBuilder("review")
      .where("review.to = :to", { to: to })
      .addOrderBy('id', 'ASC')
      .take(perPage)
      .getManyAndCount();
  }

  async findAllNextPage(to: string, perPage: number, prevId: string) {
    return this.reviewRepository.createQueryBuilder("review")
      .where("review.to = :to AND review.id > :prevId", {
        to: to,
        prevId: prevId
      })
      .addOrderBy('id', 'ASC')
      .take(perPage)
      .getManyAndCount();
  }

  // async transaction<T>(
  //   callback: (entityManager: EntityManager, repository: Repository<Review>) => Promise<T>
  // ): Promise<T>{
  //   const reviewRepository = this.reviewRepository;
  //   const reviewConnection = this.reviewRepository.manager.connection;
  //
  //   return await reviewConnection.transaction(async transactionalEntityManager => {
  //     return callback(transactionalEntityManager, reviewRepository);
  //   });
  // }

  // @Transaction()
  // async create(
  //   reviewDto: CreateReviewDto,
  //   //@TransactionManager() manager: EntityManager,
  //   @TransactionRepository(Review) reviewRepository: Repository<Review>
  // ) {
  //   const reviewCount: number = await reviewRepository.count({
  //     to: reviewDto.to
  //   });
  //
  //   const review = reviewRepository.manager.create(Review);
  //   review.from = reviewDto.from;
  //   review.to = reviewDto.to;
  //   review.reason = reviewDto.reason;
  //   review.id = review.to + '#' + (reviewCount + 1).toString().padStart(6, '0');
  //
  //   await reviewRepository.manager.save(review);
  //
  //   return review;
  // }

  //
  //
  // async create2(reviewDto: CreateReviewDto): Promise<Review> {
  //   return await this.transaction(
  //     async (entityManager, repository) => {
  //       const reviewCount: number = await repository.count({
  //         to: reviewDto.to
  //       });
  //
  //       const review = entityManager.create(Review);
  //       review.from = reviewDto.from;
  //       review.to = reviewDto.to;
  //       review.reason = reviewDto.reason;
  //       review.id = review.to + '#' + (reviewCount + 1).toString().padStart(6, '0');
  //
  //       await entityManager.save(review);
  //
  //       return review;
  //     }
  //   );
  // }

  async create(reviewDto: CreateReviewDto): Promise<Review> {
    const reviewRepository = this.reviewRepository;
    const reviewConnection = this.reviewRepository.manager.connection;

    return await reviewConnection.transaction(
      async transactionalEntityManager => {
          const reviewCount: number = await reviewRepository.count({
            to: reviewDto.to
          });

          // FIXME: get last id instead

          const review = transactionalEntityManager.create(Review);
          review.from = reviewDto.from;
          review.to = reviewDto.to;
          review.reason = reviewDto.reason;
          review.id = review.to + '#' + (reviewCount + 1).toString().padStart(6, '0');

          await transactionalEntityManager.save(review);

          return review;
      }
    );
  }


}
