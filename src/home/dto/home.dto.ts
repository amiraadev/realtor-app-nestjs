/* eslint-disable prettier/prettier */
import { PropertyType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

export class HomeResponseDto {
  id: number;
  address: string;

  @Exclude()
  number_of_bedrooms: number;
  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }

  @Exclude()
  number_of_bathrooms: number;
  @Expose({ name: 'numberOfBathrooms' })
  numberOfBathrooms() {
    return this.number_of_bathrooms;
  }

  city: string;
  @Exclude()
  listed_date: Date;
  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listed_date;
  }

  price: number;
  image: string;

  @Exclude()
  land_size: number;
  @Expose({ name: 'landSize' })
  landSize() {
    return this.land_size;
  }

  propertyType: PropertyType;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
  @Exclude()
  realtor_id: number;


  constructor(partial:Partial<HomeResponseDto>){
    Object.assign(this,partial);
  }
}

class Image{
    @IsString()
    @IsNotEmpty()
    url:string
}
export class CreateHomeDto {
    @IsString()
    @IsNotEmpty()
    address:string ;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsPositive() 
    price: number;

    @IsEnum(PropertyType)
    propertyType: PropertyType;

    @IsNumber()
    @IsPositive()  
    numberOfBedrooms: number;

    @IsNumber()
    @IsPositive()
    numberOfBathrooms: number;

    listedDate: Date;

    @IsNumber()
    @IsPositive()
    landSize: number;

    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>Image)
    images:Image[]
}

export class UpdateHomeDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?:string ;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    city?: string;

    @IsNumber()
    @IsPositive() 
    @IsOptional()
    price?: number;

    @IsEnum(PropertyType)
    @IsOptional()
    propertyType?: PropertyType;

    @IsNumber()
    @IsPositive() 
    @IsOptional() 
    numberOfBedrooms?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    numberOfBathrooms?: number;

    listedDate?: Date;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    landSize?: number;

  
}
