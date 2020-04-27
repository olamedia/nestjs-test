import { Test, TestingModule } from '@nestjs/testing'
import { ReviewController } from './review.controller'
import { ReviewCreateRequestDto } from './dto/review-create-request.dto'

describe('Review Controller', () => {
  let controller: ReviewController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
    }).compile()

    controller = module.get<ReviewController>(ReviewController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should add review', () => {
    const dto: ReviewCreateRequestDto = {
      from: 'from-id',
      to: 'to-id',
      reason: 'reason-text',
    }
    controller.add(dto)
  })
})
