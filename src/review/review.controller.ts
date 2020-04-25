import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ListById, ListNextPage } from './dto/list-all.dto';

@Controller('review')
export class ReviewController {

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
  @Get()
  async list(@Query() query: ListById | ListNextPage): Promise<string> {

    return 'list';
  }

  /*
  Второй эндпойнт add получает POST с json-body вида { from: 'xxx', to: 'yyy', reason: 'blah' },
  причём считается что from и to уже провалидированы на более высоком уровне
  и являются полностью валидными идентификаторами реально существующих в системе пользователей.
  From может быть null.
  Add должен исключать возможность race condition при добавлении записей.
   */
  @Post()
  async add(@Body() createReviewDto: CreateReviewDto): Promise<string> {
    return 'add';
  }

}
