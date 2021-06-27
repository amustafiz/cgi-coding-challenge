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

  describe('getAllCounters', () => {
    it('should return an empty array if no counters are set', () => {
      expect(appController.getAllCounters()).toEqual([]);
    });

    it('should return an array of counters', () => {
      const counters = [getDummyCounter(), getDummyCounter()];
      appService.counters = counters;

      expect(appController.getAllCounters()).toBe(counters);
    });
  });

  describe('getOneCounter', () => {
    it('should return a counter having the same key as argument', () => {
      const counter = getDummyCounter();
      const key = Object.keys(counter)[0];
      appService.counters = [counter, getDummyCounter()];

      expect(appController.getOneCounter(key)).toBe(counter);
    });

    it('should fail if there are no counters containing passed argument in memory', () => {
      appService.counters = [getDummyCounter()];

      expect(() => appController.getOneCounter('test')).toThrow(
        'Counter not found',
      );
    });
  });
  describe('createCounter', () => {
    it('should create a new counter in counters', () => {
      const counter = getDummyCounter();
      const oldCounterList = [...appService.counters];
      const newCounterList = [
        ...oldCounterList,
        ...appService.createCounter(counter),
      ];

      expect(newCounterList.length).toEqual(oldCounterList.length + 1);
      expect(newCounterList[newCounterList.length - 1]).toEqual(counter);
    });
  });
  describe('incrementCounter', () => {
    it('should increment a selected counter value by 1', () => {
      const counter = getDummyCounter();
      const key = Object.keys(counter)[0];
      const value = Object.values(counter)[0];
      appService.counters = [counter, getDummyCounter()];
      const incrementedValue = Object.values(
        appService.incrementCounter(key),
      )[0];

      expect(incrementedValue).toEqual(value + 1);
    });

    it('should fail if passed value for counter does not exist in counters list', () => {
      appService.counters = [getDummyCounter()];

      expect(() => appController.getOneCounter('test')).toThrow(
        'Counter not found',
      );
    });
  });
  describe('decrementCounter', () => {
    it('should decrement a selected counter value by 1', () => {
      const counter = getDummyCounter();
      const key = Object.keys(counter)[0];
      const value = Object.values(counter)[0];
      appService.counters = [counter, getDummyCounter()];
      const incrementedValue = Object.values(
        appService.decrementCounter(key),
      )[0];

      expect(incrementedValue).toEqual(value - 1);
    });

    it('should delete counter if value <= 0', () => {
      const counter = { counter1: 1 };
      appService.counters = [counter, getDummyCounter()];
      appService.decrementCounter('counter1');

      expect(appService.counters.length).toEqual(1);
      expect(
        appService.counters.find((counter) =>
          counter.hasOwnProperty('counter1'),
        ),
      ).toBeFalsy();
    });

    it('should fail if passed value for counter does not exist in counters list', () => {
      appService.counters = [getDummyCounter()];

      expect(() => appController.getOneCounter('test')).toThrow(
        'Counter not found',
      );
    });
  });
});
