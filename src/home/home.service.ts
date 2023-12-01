import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';

interface GetHomesParams {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
  propertyType?: PropertyType;
}
@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}
  async getHomes(filter: GetHomesParams): Promise<HomeResponseDto[]> {
    const home = await this.prismaService.home.findMany({
      select: {
        id: true,
        city: true,
        propertyType: true,
        number_of_bedrooms: true,
        number_of_bathrooms: true,
        address: true,
        price: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: filter,
    });
    if (!home.length) {
      throw new NotFoundException('No homes found matching the criteria.');
    }
    return home.map((home) => {
      const fetchHome = { ...home, image: home.images[0].url };
      delete fetchHome.images;
      //   console.log(new HomeResponseDto(fetchHome));
      return new HomeResponseDto(fetchHome);
    });
  }
}
