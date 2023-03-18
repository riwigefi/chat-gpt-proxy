import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {
  private readonly httpService: HttpService;
  private apiKeys = [];
  private currentKeyIndex = 0;

  constructor() {
    this.httpService = new HttpService();
    this.apiKeys = process.env.API_KEYS.split(',');
  }

  private getNextApiKey() {
    const key = this.apiKeys[this.currentKeyIndex];
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    return key;
  }

  async getCompletions(messages: { role: string; content: string }[]) {
    const apiKey = this.getNextApiKey();
    const url = `https://api.openai.com/v1/chat/completions`;
    const headers = {
      Authorization: `Bear ${apiKey}`,
      'Content-Type': 'application/json',
    };
    const data = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.6,
      stream: true,
    };
    const requestOptions = { headers };

    return this.httpService
      .post(url, data, requestOptions)
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
