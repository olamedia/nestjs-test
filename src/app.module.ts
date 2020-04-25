import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ReviewModule } from './review/review.module';
import { ReviewController } from './review/review.controller';

@Module({
  imports: [DatabaseModule, ReviewModule],
  controllers: [AppController, ReviewController],
  providers: [AppService],
})
export class AppModule {}
