import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  chat(
    @Body() messages: { role: string; content: string }[],
  ): Promise<Observable<any>> {
    return this.chatService.getCompletions(messages);
  }
}
