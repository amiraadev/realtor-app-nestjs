import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';
import { User, UserAuthorized } from 'src/user/decorators/user.decorators';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHomes(
    @User() user,
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;
    const filters = {
      ...(city && { city }),
      ...(price && { price }),
      ...(propertyType && { propertyType }),
    };
    // console.log(filters);

    return this.homeService.getHomes(filters);
    // return user;
  }

  @Get(':id')
  getHome(@Param('id', ParseIntPipe) id: number): Promise<HomeResponseDto> {
    return this.homeService.getHome(id);
  }

  @Post()
  createHome(@Body() body: CreateHomeDto, @User() user: UserAuthorized) {
    return this.homeService.createHome(body, user.id);
  }

  @Put(':id')
  updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHomeDto,
  ) {
    return this.homeService.updateHomeById(id, body);
    // return body;
  }

  @Delete(':id')
  deleteHome(@Param('id', ParseIntPipe) id: number) {
    this.homeService.deleteHomeById(id);
  }
}
