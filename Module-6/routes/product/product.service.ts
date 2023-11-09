import { Injectable } from '@nestjs/common';
import { getProducts, getProductById} from './product.data';
import {ProductEntity} from "../../data/product";
@Injectable()
export class ProductService {
    getProducts(): ProductEntity[] {
        return getProducts();
    }
    getProductById(id): ProductEntity {
        return getProductById(id);
    }
}
