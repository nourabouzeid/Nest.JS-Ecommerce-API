import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
    constructor(private prisma:PrismaService){}

    async createOrder(dto: CreateOrderDto,userId:number){
       const order= await this.prisma.orders.create({
        data: {
            userId:userId,
            status:dto.status
        },
      });
      const cart = await this.prisma.carts.findUnique({
      where: { userId: userId }
      });

      const cartProducts =await this.prisma.cartProduct.findMany({
      where: { cartId: cart.cartId },
    });
    for(const product of cartProducts)
    {
        await this.prisma.orderProducts.create({
            data: {
                orderId:order.orderId,
                productId:product.productId,
                quantity:product.quantity
            },
        });
    }
    return order
    }
    
    async viewOrder(orderId: number)
    {
      const order = await this.prisma.orders.findUnique({
      where: { orderId: orderId }
      });

      return this.prisma.orderProducts.findMany({
      where: { orderId: order.orderId },
    });
    }

    async updateOrder(dto: CreateOrderDto, orderId: number) {
      const res=await this.prisma.orders.update({
        where: { 
            orderId:orderId
        },
        data: {
          status: dto.status
        },
      });
      return res
    }
}
