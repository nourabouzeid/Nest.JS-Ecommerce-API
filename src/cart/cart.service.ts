import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto, RemoveFromCartDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}
    
    async addToCart(dto: AddToCartDto, userId: number) {
        const cart = await this.prisma.carts.findUnique({
      where: { userId: userId }
    });


    const existingCartItem = await this.prisma.cartProduct.findFirst({
        where:{
            cartId:cart.cartId,
            productId:dto.productId
        }
    });

    let res;
    if (existingCartItem) {
      res=await this.prisma.cartProduct.update({
        where: { 
            cartId_productId : {
                cartId:existingCartItem.cartId , 
                productId: existingCartItem.productId,
            }
        },
        data: {
          quantity: {
            increment: dto.quantity,
          },
        },
      });
    } else {
      res=await this.prisma.cartProduct.create({
        data: {
          cartId: cart.cartId,
          productId: dto.productId,
          quantity: dto.quantity,
        },
      });
    }
    return res;
    }

    async viewCart(userId: number)
    {
      const cart = await this.prisma.carts.findUnique({
      where: { userId: userId }
      });

      return this.prisma.cartProduct.findMany({
      where: { cartId: cart.cartId },
    });
    }

    async updateCart(dto: AddToCartDto, userId: number) {
        const cart = await this.prisma.carts.findUnique({
      where: { userId: userId }
    });


    const existingCartItem = await this.prisma.cartProduct.findFirst({
        where:{
            cartId:cart.cartId,
            productId:dto.productId
        }
    });

    if (existingCartItem) {
      const res=await this.prisma.cartProduct.update({
        where: { 
            cartId_productId : {
                cartId:existingCartItem.cartId , 
                productId: existingCartItem.productId,
            }
        },
        data: {
          quantity: dto.quantity
        },
      });
      return res
    } else {
        throw Error('Product does not exist')
    }
    }

    async removeFromCart(dto: RemoveFromCartDto, userId: number) {
        const cart = await this.prisma.carts.findUnique({
      where: { userId: userId }
    });


    const existingCartItem = await this.prisma.cartProduct.findFirst({
        where:{
            cartId:cart.cartId,
            productId:dto.productId
        }
    });

    if (existingCartItem) {
      const res=await this.prisma.cartProduct.delete({
        where: { 
            cartId_productId : {
                cartId:existingCartItem.cartId , 
                productId: existingCartItem.productId,
            }
        },
      });
      return res
    } else {
        throw Error('Product does not exist')
    }
    }
}
