/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';
export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,{message:"phone must be a valid phone number"})
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}
export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
