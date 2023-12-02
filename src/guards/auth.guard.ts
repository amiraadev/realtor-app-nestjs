/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if(roles?.length) {
        const request = context.switchToHttp().getRequest();
        const token = request?.headers?.authorization?.split('Bearer ')[1];
        try {
           const user = await jwt.verify(token,process.env.TOKEN_SECRET)
           console.log(user); 
           return true;   
        } catch (error) {
            return false;   
        }
    }
    
    return true;
  }
}
