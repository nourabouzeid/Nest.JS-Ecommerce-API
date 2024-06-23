import { ApiProperty } from '@nestjs/swagger'
import {IsNotEmpty,IsNumber,IsString} from 'class-validator'
export class AddProductDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String,description:"name"})
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String,description:"description"})
    description: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type:Number,description:"price"})
    price: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type:Number,description:"stock"})
    stock: number
   }