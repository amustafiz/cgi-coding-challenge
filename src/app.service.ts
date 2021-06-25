import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class AppService {
  counters: Counter[] = [];

  getAllCounters(): Array<{ [key: string]: number }> {
    return this.counters;
  }

  getOneCounter(counterKey: string) {
    const foundCounter = this.counters.find((counter) =>
      counter.hasOwnProperty(counterKey),
    );

    if (foundCounter) {
      return foundCounter;
    } else {
      throw new HttpException('Counter not found', 404);
    }
  }

  createCounter(counter: Counter) {
    this.counters.push(counter);
    return this.counters;
  }

  incrementCounter(counterKey: string) {
    const foundCounter = this.counters.find((counter) =>
      counter.hasOwnProperty(counterKey),
    );

    if (foundCounter) {
      foundCounter[counterKey]++;
      return foundCounter;
    } else {
      throw new HttpException('Counter not found', 404);
    }
  }
}
