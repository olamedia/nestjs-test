jest.mock('./review.service')

import { Test, TestingModule } from '@nestjs/testing'
import { ReviewController } from './review.controller'
import { ReviewCreateRequestDto } from './dto/review-create-request.dto'
import { ReviewService } from './review.service'
import { ReviewQueryTransformer } from './review.query.transformer'
import { ReviewListRequestDto } from './dto/review-list-request.dto'
import { Review } from './review.entity'

describe('Review Controller', () => {
  let controller: ReviewController
  let reviewService: ReviewService
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let reviewQueryTransformer: ReviewQueryTransformer

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService, ReviewQueryTransformer],
    }).compile()

    reviewService = module.get<ReviewService>(ReviewService)
    reviewQueryTransformer = module.get<ReviewQueryTransformer>(
      ReviewQueryTransformer,
    )
    controller = module.get<ReviewController>(ReviewController)
  })

  it('should be defined', async () => {
    expect(controller).toBeDefined()
  })

  it('should add review', async () => {
    const dto: ReviewCreateRequestDto = {
      from: 'from-id',
      to: 'to-id',
      reason: 'reason-text',
    }
    const exampleReview = {
      id: 'to-id#000001',
      from: 'from-id',
      to: 'to-id',
      reason: 'reason-text',
    }
    jest.spyOn(reviewService, 'create').mockImplementation(async () => {
      return exampleReview
    })

    const result: Review = await controller.add(dto)

    expect(result).toMatchObject(exampleReview)
  })

  it('should list reviews, first page', async () => {
    const dto: ReviewListRequestDto = {
      id: 'to-id',
      perPage: 2,
    }
    const items: Review[] = [
      {
        id: 'to-id#000001',
        from: null,
        to: 'to-id',
        reason: 'reason1',
      },
      {
        id: 'to-id#000002',
        from: 'from-id',
        to: 'to-id',
        reason: 'reason2',
      },
    ]
    const total = items.length + 5
    jest
      .spyOn(reviewService, 'findAllPaged')
      .mockImplementation(async () => [items, total])

    const result = await controller.list(dto)

    expect(result).toMatchObject({
      total,
      nextCursor: 'dG8taWQjMiMy', //  to-id#2#2
      items,
    })
  })

  it('should list reviews, next page', async () => {
    const dto: ReviewListRequestDto = {
      cursor: 'dG8taWQjMiMy', //  to-id#2#2
    }
    const items: Review[] = [
      {
        id: 'to-id#000003',
        from: null,
        to: 'to-id',
        reason: 'reason3',
      },
      {
        id: 'to-id#000004',
        from: 'from-id',
        to: 'to-id',
        reason: 'reason4',
      },
    ]
    const total = 7
    jest
      .spyOn(reviewService, 'findAllPaged')
      .mockImplementation(async () => [items, total])

    const result = await controller.list(dto)

    expect(result).toMatchObject({
      total,
      nextCursor: 'dG8taWQjMiM0', // to-id#2#4
      items,
    })
  })
})
