import { Schema, model } from 'mongoose';

export interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
}

export const productSchema = new Schema<ProductEntity>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
});

export const Product = model<ProductEntity>("Product", productSchema);
