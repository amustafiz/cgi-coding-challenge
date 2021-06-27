import { Test, TestingModule } from '@nestjs/testing';
import faker = require('faker');

import { AppController } from './app.controller';
import { AppService } from './app.service';

const getDummyCounter = (): Counter => {
  return { [faker.random.word()]: faker.datatype.number() };
};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe.only('getAllCounters', () => {
    it('should return an empty array if no counters are set', () => {
      expect(appController.getAllCounters()).toEqual([]);
    });

    it('should return an array of counters', () => {
      const counters = [getDummyCounter(), getDummyCounter()];

      appService.counters = counters;

      expect(appController.getAllCounters()).toBe(counters);
    });
  });
});
