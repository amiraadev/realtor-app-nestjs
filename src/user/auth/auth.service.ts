import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}
interface SignInParams {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup(
    { email, password, name, phone }: SignupParams,
    userType: UserType,
  ) {
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
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        user_type: userType,
      },
    });

    const token = await this.generateJWT(user.name, user.id);
    return token;
  }

  async signIn({ email, password }: SignInParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException('Invalid Credentials', 400);
    }

    const hashedPassword = await user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (!isValidPassword) {
      throw new HttpException('Invalid Credentials', 400);
    }
    const token = await this.generateJWT(user.name, user.id);
    return token;
  }

  private generateJWT(name: string, id: number) {
    return jwt.sign({ name: name, id: id }, process.env.TOKEN_SECRET, {
      expiresIn: 24 * 60 * 60,
    });
  }

  generateProductKey(email: string, userType: UserType) {
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
    return bcrypt.hash(string, 10);
  }
}
