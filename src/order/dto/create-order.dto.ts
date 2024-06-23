import { ApiProperty } from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
export class CreateOrderDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String,description:"status"})
    status: string
}