import { CanActivate } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate() {
    return true;
  }
}
