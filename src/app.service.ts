import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class AppService {
  counters: Counter[] = [];

  getAllCounters(): Array<{ [key: string]: number }> {
    return this.counters;
  }

  getOneCounter(counterKey: string) {
    const foundCounter = this.findCounter(counterKey);

    if (!foundCounter) {
      throw new HttpException('Counter not found', 404);
    }

    return foundCounter;
  }

  createCounter(counter: Counter) {
    for (const key in counter) {
      counter[key] = +counter[key];
    }

    this.counters.push(counter);
    return this.counters;
  }

  incrementCounter(counterKey: string) {
    const foundCounter = this.findCounter(counterKey);

    if (!foundCounter) {
      throw new HttpException('Counter not found', 404);
    }

    foundCounter[counterKey]++;

    return foundCounter;
  }

  decrementCounter(counterKey: string) {
    const foundCounter = this.findCounter(counterKey);

    if (!foundCounter) {
      throw new HttpException('Counter not found', 404);
    }

    const value = foundCounter[counterKey];

    if (value > 1) {
      foundCounter[counterKey]--;
      return foundCounter;
    } else {
      this.deleteCounter(counterKey);
      return `counter with ${counterKey} was removed`;
    }
  }

  private findCounter(counterKey: string): Counter | undefined {
    return this.counters.find((counter) => counter.hasOwnProperty(counterKey));
  }

  private deleteCounter(counterKey) {
    const index = this.counters.findIndex((counter) =>
      counter.hasOwnProperty(counterKey),
    );
    this.counters.splice(index, 1);
  }
}
