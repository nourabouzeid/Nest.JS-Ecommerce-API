import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderProducts, Orders } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}

    async getOrderHistory(userId:number){
        
        const orders = await this.prisma.orders.findMany({
      where: { userId:userId },
    });
    
    const orderHistory: { order: Orders; orderProducts: OrderProducts[] }[] = [];

    for(const order of orders)
    {
        const orderProducts = await this.prisma.orderProducts.findMany({
            where: { orderId:order.orderId },
        });
        orderHistory.push({ order, orderProducts });
    }
    return orderHistory
    }
}
