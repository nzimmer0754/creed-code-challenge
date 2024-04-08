import { Module } from '@nestjs/common';
import { PodcasteController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], // use this to import other modules. these modules will have thier own controllers and services
  controllers: [PodcasteController],
  providers: [AppService],
})
export class AppModule {}
