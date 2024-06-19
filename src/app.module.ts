import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisitService } from './visit/visit.service';
import { AnimalService } from './animal/animal.service';
import { EnclosureService } from './enclosure/enclosure.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AnimalService,VisitService, EnclosureService],
})
export class AppModule {}
