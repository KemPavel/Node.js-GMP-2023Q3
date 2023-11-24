import {Controller, Get, Param} from '@nestjs/common';
import { ProductService } from './product.service';
import {ProductEntity} from "../../data/product";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts(): ProductEntity[] {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProductById(@Param('id') id: string): ProductEntity {
        return this.productService.getProductById(id);
    }
}
