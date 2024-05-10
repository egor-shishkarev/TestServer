import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async get(): Promise<string> {
    const selectedSymbols = [];
    for (let i = 0; i < 36; ++i) {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        selectedSymbols.push('-');
        continue;
      }
      selectedSymbols.push(this.getRandomSymbol());
    }
    const apiKey = selectedSymbols.join('');
    const response = await fetch(
      `https://api.routing.yandex.net/v2/route?waypoints=25.234369457896325,55.280222457968712|25.234369457896325,55.401544758961258&apikey=${apiKey}`,
    );
    const jsonReponse = await response.json();
    const stringResponse = JSON.stringify(jsonReponse);
    return apiKey + `Response: ${stringResponse}`;
  }

  getRandomSymbol(): string {
    const availableSymbols = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
    ];
    const randomIndex = Math.floor(Math.random() * availableSymbols.length);
    return availableSymbols[randomIndex];
  }
}
