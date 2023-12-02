import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from './home.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeService, PrismaService],
    }).compile();

    service = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
