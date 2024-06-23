import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, RemoveFromCartDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { Users } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';


@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}

    @UseGuards(JwtGuard)
    @Post('add')
    @ApiCreatedResponse({description:'Add to Cart'})
    @ApiBody({type:AddToCartDto})
    @ApiBearerAuth('access-token')
    addToCart(@Body() dto: AddToCartDto,@GetUser() user: Users){
        return this.cartService.addToCart(dto,user.userId)
    }
    @UseGuards(JwtGuard)
    @Get('view')
    @ApiOkResponse({description:'View Cart of Current User'})
    @ApiBearerAuth('access-token')
    getCart(@GetUser() user: Users){
        return this.cartService.viewCart(user.userId)
    }
    @Get(':userId')
    @ApiOkResponse({description:'View Cart by User Id'})
    viewCart(@Param('userId',ParseIntPipe) userId: number){
        return this.cartService.viewCart(userId)
    }
    @UseGuards(JwtGuard)
    @Put('update')  
    @ApiOkResponse({description:'Update Product Quantity in Cart'})
    @ApiBody({type:AddToCartDto})
    @ApiBearerAuth('access-token')
    updateCart(@Body() dto: AddToCartDto,@GetUser() user: Users){
        return this.cartService.updateCart(dto,user.userId)
    }
    @UseGuards(JwtGuard)
    @Delete('remove')
    @ApiOkResponse({description:'Remove Product from Cart'})
    @ApiBody({type:RemoveFromCartDto})
    @ApiBearerAuth('access-token')
    removeFromCart(@Body() dto: RemoveFromCartDto,@GetUser() user: Users){
        return this.cartService.removeFromCart(dto,user.userId)
    }
}
