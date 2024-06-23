import { ApiProperty } from '@nestjs/swagger'
import {IsNotEmpty,IsNumber} from 'class-validator'
export class AddToCartDto{

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type:Number,description:"productId"})
    productId: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type:Number,description:"quantity"})
    quantity: number
}