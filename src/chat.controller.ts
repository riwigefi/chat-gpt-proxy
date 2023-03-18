import { Controller, Post, Body, Header, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  // constructor(private readonly httpService: HttpService) {}

  // @Post()
  // chat(
  //   @Body() messages: { role: string; content: string }[],
  // ): Promise<Observable<any>> {
  //   return this.chatService.getCompletions(messages);
  // }

  @Post()
  @Header('Content-type', 'application/octet-stream')
  async chat(
    @Body() payload: { messages: { role: string; content: string }[] },
    @Res() res,
  ): Promise<any> {
    console.log('message--', payload.messages);

    try {
      const stream = await this.chatService.getCompletions(payload.messages);
      stream.pipe(res);
    } catch (error) {
      const message = error.message || 'Unknown error';
      const status = error.status || 500;
      return { message, status };
    }
  }
}
