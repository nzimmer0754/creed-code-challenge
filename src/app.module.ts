import { Module } from '@nestjs/common';
import { PodcasteController } from './app.controller';
import { AppService } from './app.service';
// Apis are defined in the controller

@Module({
  imports: [],
  controllers: [PodcasteController],
  providers: [AppService],
})
export class AppModule {}
