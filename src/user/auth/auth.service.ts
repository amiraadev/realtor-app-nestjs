import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup({ email, password }: SignupParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    // console.log({ userExists });
    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  }
}
