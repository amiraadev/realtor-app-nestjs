import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('home')
export class HomeController {
  @Get()
  getHomes() {
    return [];
  }

  @Get(':id')
  getHome() {
    return {};
  }

  @Post()
  createHome() {
    return {};
  }

  @Put(':id')
  updateHome() {
    return {};
  }

  @Delete(':id')
  deleteHome() {
    return {};
  }
}
