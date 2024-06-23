import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { GetUser } from '../auth/decorator';
import { Users } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService){}

    @UseGuards(JwtGuard)
    @Post()
    @ApiCreatedResponse({description:'Order Creation'})
    @ApiBody({type:CreateOrderDto})
    @ApiBearerAuth('access-token')
    async createOrder(@Body() dto: CreateOrderDto,@GetUser() user: Users) {
        return this.orderService.createOrder(dto,user.userId)
    }

    @Get(':orderId')
    @ApiOkResponse({description:'Get Order by Id'})
    viewOrder(@Param('orderId',ParseIntPipe) orderId: number){
        return this.orderService.viewOrder(orderId)
    }

    @Put(':orderId/status') 
    @ApiOkResponse({description:'Update Order Status by Id'})
    updateOrder(@Body() dto: CreateOrderDto,@Param('orderId',ParseIntPipe) orderId: number){
        return this.orderService.updateOrder(dto,orderId)
    }
}
