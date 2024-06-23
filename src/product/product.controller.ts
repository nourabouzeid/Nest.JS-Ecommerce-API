import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDto } from './dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){}

    @Post('add')
    @ApiCreatedResponse({description:'Add Product'})
    @ApiBody({type:AddProductDto})
    async addProduct(@Body() dto: AddProductDto){
        return this.productService.addProduct(dto)
    }
}
