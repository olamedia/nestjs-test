import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { ReviewResponseBuilder } from './review.response.builder';
import { ReviewListResponseDto } from './dto/list-response.dto';
import { ListRequestDto } from './dto/list-request.dto';
import { ReviewListCursor } from './review.list.cursor';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('review')
export class ReviewController {
  constructor(
    private reviewService: ReviewService,
    private responseBuilder: ReviewResponseBuilder
  ) {}
  /*
  List получает id пользователя-получателя и отдаёт список благодарностей от самых свежих к самым старым.
  Пагинация обеспечивается с помощью курсора: возможны два варианта параметров запроса:
  ?id=abcxyz0203040506&perPage=20 – запрашивает первую страницу результатов и определяет что каждая страница содержит 20 записей.
  ?cursor=oeufgwneiucgo2bitroibuwqnvqvowiytnqvoerym – запрашивает следующую страницу результатов по тем же параметрам.
  Ответ в формате { total: 234, nextCursor: 'oeufgwneiucgo2bitroibuwqnvqvowiytnqvoerym', items: [ {from: '', reason: ''}, {from: '', reason: ''} ] }.
  Если страница данных последняя, клиент получает ответ с nextCursor: null или вовсе без него.
  Заранее известно что клиент разрабатывается junior-разработчиками.
  Если неправильно запрограммированный клиент пришлёт id и perPage вместе с cursor, они должны быть проигнорированы.
  Также cursor должен иметь формат, позволяющий включать его в url запроса без url-encoding-а – джуны постоянно забывают про encodeURIComponent. :)
   */
  @Get('list')
  async list(@Query() query: ListRequestDto): Promise<ReviewListResponseDto> {
    if (query.cursor !== undefined) {
      console.log('query.cursor !== undefined', query);
      const prev: number = await this.reviewCursor.extractQuery(query, query.cursor);
      const [items, total] = await this.reviewService.findAllNextPage(query.id, query.perPage, query.id + '#' + prev);
      const cursor = await this.reviewCursor.createNextCursor(query, items);
      return await this.responseBuilder.listResponse(total, cursor, items);
    }
    if (query.id !== undefined && query.perPage !== undefined) {
      const [items, total] = await this.reviewService.findAllFirstPage(query.id, query.perPage);
      const cursor = await this.reviewCursor.createNextCursor(query, items);
      return await this.responseBuilder.listResponse(total, cursor, items);
    }
  }

  /*
  Второй эндпойнт add получает POST с json-body вида { from: 'xxx', to: 'yyy', reason: 'blah' },
  причём считается что from и to уже провалидированы на более высоком уровне
  и являются полностью валидными идентификаторами реально существующих в системе пользователей.
  From может быть null.
  Add должен исключать возможность race condition при добавлении записей.
   */
  @Post('add')
  async add(@Body() createReviewDto: CreateReviewDto): Promise<string> {
    await this.reviewService.create(createReviewDto);
    return 'add';
  }

}
