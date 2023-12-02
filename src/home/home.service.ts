import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHomeDto, HomeResponseDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';

interface GetHomesParams {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
  propertyType?: PropertyType;
}

interface CreateHomeParams {
  address: string;
  city: string;
  price: number;
  propertyType: PropertyType;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  listedDate: Date;
  landSize: number;
  images: { url: string }[];
}
interface UpdateHomeParams {
  address?: string;
  city?: string;
  price?: number;
  propertyType?: PropertyType;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  listedDate?: Date;
  landSize?: number;
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
      return new HomeResponseDto(fetchHome);
    });
  }
  async getHome(id: number): Promise<HomeResponseDto> {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });
    if (!home) {
      throw new NotFoundException('No home found matching this id.');
    }

    return new HomeResponseDto(home);
  }

  async createHome(
    {
      address,
      city,
      price,
      propertyType,
      numberOfBedrooms,
      numberOfBathrooms,
      listedDate,
      landSize,
      images,
    }: CreateHomeParams,
    userId: number,
  ) {
    const home = await this.prismaService.home.create({
      data: {
        address,
        number_of_bedrooms: numberOfBedrooms,
        number_of_bathrooms: numberOfBathrooms,
        city,
        listed_date: listedDate,
        price,
        land_size: landSize,
        propertyType,
        realtor_id: userId,
      },
    });
    const homeImages = images.map((image) => {
      return { ...image, home_id: home.id };
    });
    await this.prismaService.image.createMany({ data: homeImages });
    return new HomeResponseDto(home);
  }

  async updateHomeById(id: number, data: UpdateHomeParams) {
    const home = this.prismaService.home.findUnique({
      where: {
        id: id,
      },
    });
    if (!home) {
      throw new NotFoundException('No home found matching this id.');
    }
    const upadatedHome = await this.prismaService.home.update({
      where: {
        id,
      },
      data,
    });
    return new HomeResponseDto(upadatedHome);
  }
  async deleteHomeById(id: number) {
    await this.prismaService.image.deleteMany({
      where: {
        home_id: id,
      },
    });
    await this.prismaService.home.delete({
      where: {
        id,
      },
    });
  }

  async getRealtorByHomeId(id: number) {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
      select: {
        realtor: {
          select: {
            name: true,
            id: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!home) {
      throw new NotFoundException('No home found matching this id.');
    }
    return home.realtor;
  }
}
