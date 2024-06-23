import { ApiProperty } from '@nestjs/swagger'
import {IsNotEmpty,IsNumber} from 'class-validator'
 
export class RemoveFromCartDto {
     @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type:Number,description:"productId"})
    productId: number
}