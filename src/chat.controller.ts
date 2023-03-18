import { Controller, Post, Body } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Post()
  // chat(
  //   @Body() messages: { role: string; content: string }[],
  // ): Promise<Observable<any>> {
  //   return this.chatService.getCompletions(messages);
  // }

  @Post()
  async chat(
    @Body() payload: { messages: { role: string; content: string }[] },
  ): Promise<any> {
    console.log('message--', payload.messages);

    try {
      const result = await this.chatService.getCompletions(payload.messages);
      return firstValueFrom(result);
    } catch (error) {
      const message = error.message || 'Unknown error';
      const status = error.status || 500;
      return { message, status };
    }
  }
}
