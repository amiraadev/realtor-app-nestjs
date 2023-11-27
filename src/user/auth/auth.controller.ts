import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SignInDto, SignupDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup/:userType')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }
  @Post('/signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
  @Post('/key')
  generateProductKey(@Body() { email, userType }: GenerateProductKeyDto) {
    return this.authService.generateProductKey(email, userType);
  }
}
