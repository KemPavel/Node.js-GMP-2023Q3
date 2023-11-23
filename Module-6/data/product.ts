export interface ProductEntity {
    uuid: string; // uuid
    title: string;
    description: string;
    price: string;
}

export const product: ProductEntity = {
    uuid: '51422fcd-0366-4186-ad5b-c23059b6f64f',
    title: 'Book',
    description: 'A very interesting book',
    price: '100'
};

