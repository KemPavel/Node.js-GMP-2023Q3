import { Injectable } from '@nestjs/common';
import { getProducts, getProductById} from './product.data';

@Injectable()
export class ProductService {
    getProducts() {
        return getProducts();
    }
    getProductById(id) {
        return getProductById(id);
    }
}
