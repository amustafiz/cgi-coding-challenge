import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/counters')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllCounters() {
    return this.appService.getAllCounters();
  }

  @Get('/:counter')
  getOneCounter(@Param('counter') counterKey: string) {
    return this.appService.getOneCounter(counterKey);
  }

  @Post()
  createCounter(@Body() counter: Counter) {
    return this.appService.createCounter(counter);
  }

  @Put('/:counter')
  incrementCounter(@Param('counter') counterKey: string) {
    return this.appService.incrementCounter(counterKey);
  }

  @Delete('/:counter')
  decrementCounter(@Param('counter') counterKey: string){
    return this.appService.decrementCounter(counterKey);
  }
}
