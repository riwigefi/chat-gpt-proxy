import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService],
})
export class AppModule {}
