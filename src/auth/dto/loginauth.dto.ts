import { ApiProperty } from '@nestjs/swagger'
import {IsEmail,IsNotEmpty,IsString} from 'class-validator'
 
export class LoginAuthDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type:String,description:"email"})
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String,description:"password"})
    password: string
}