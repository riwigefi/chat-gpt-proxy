import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

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

  async getCompletions(
    messages: { role: string; content: string }[],
  ): Promise<Observable<any>> {
    const apiKey = this.getNextApiKey();

    console.log('客户端发来的字符串--', JSON.stringify(messages));

    console.log('this.apiKeys', this.apiKeys);

    console.log('apiKey--', apiKey);
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

    return this.httpService.post(url, data, requestOptions).pipe(
      map((response: AxiosResponse) => {
        console.log('响应--', response.data);
        return response.data;
      }),
      catchError((error) => {
        const message = error.response?.data?.message || 'Something went wrong';
        return throwError(() => new Error(message));
      }),
    );
  }
}
