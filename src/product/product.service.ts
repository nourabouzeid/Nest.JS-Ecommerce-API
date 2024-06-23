import { Injectable } from '@nestjs/common';
import { AddProductDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}
    async addProduct(dto: AddProductDto){
        const product = await this.prisma.products.create({
            data:{
                ...dto
            }
        })
        return product
    }
}
