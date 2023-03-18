import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller('/chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  chat(
    @Body() messages: { role: string; content: string }[],
  ): Promise<Observable<any>> {
    return this.appService.getCompletions(messages);
  }
}
