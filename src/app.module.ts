import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisitService } from './visit/visit.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VisitService],
})
export class AppModule {}
