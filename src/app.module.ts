import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalService } from './animal/animal.service';
import { EnclosureService } from './enclosure/enclosure.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AnimalService, EnclosureService],
})
export class AppModule {}
