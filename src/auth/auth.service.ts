import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LoginAuthDto,SignupAuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService,private jwt: JwtService, private config: ConfigService){}
    async login(dto:LoginAuthDto){
        const user=await this.prisma.users.findUnique({
            where:{
                email:dto.email
            }
        })
        if(!user)
            throw new ForbiddenException("Email doesn't exist")
        const pwMatches= await argon.verify(user.password,dto.password)
        if(!pwMatches)
            throw new ForbiddenException('Password is incorrect')

        return await this.signToken(user.userId,user.email)
    }
    
    async signup(dto: SignupAuthDto){
        const hash=await argon.hash(dto.password)
        
        try{
        const user = await this.prisma.users.create({
            data:{
                email:dto.email,
                password:hash,
                address:dto.address,
                name:dto.name,
                cart:{create:{}}
            }
        })

      return await this.signToken(user.userId,user.email)
    }
    catch(err) {
        if(err instanceof PrismaClientKnownRequestError) {
            if(err.code=='P2002') {
                throw new ForbiddenException('Email is already taken')
            }
        }
        throw err; 
    }

    }

    async signToken(userId: number, email:string): Promise<{access_token:string}> {
        const payload={
            sub: userId,
            email
        }
        const access_token=await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })
        return {access_token}
    }
}