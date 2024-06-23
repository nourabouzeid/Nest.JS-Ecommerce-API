import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Users } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    @UseGuards(JwtGuard)
    @Get('me')
    @ApiOkResponse({description:'Get Current User'})
    @ApiBearerAuth('access-token')
    getMe(@GetUser() user: Users){
        return user
    }

    @Get(':userId/orders')
    @ApiOkResponse({description:'Get Order History'})
    async getOrderHistory(@Param('userId',ParseIntPipe) userId: number){
        return this.userService.getOrderHistory(userId)
    }
}
