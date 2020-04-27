import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ReviewModule } from './review/review.module'
import { ReviewController } from './review/review.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeormConfigService } from './typeorm.config.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfigService,
    }),
    ReviewModule,
  ],
  controllers: [AppController, ReviewController],
  providers: [AppService],
})
export class AppModule {}
