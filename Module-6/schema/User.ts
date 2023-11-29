import { Schema, model } from 'mongoose';

export interface UserEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema<UserEntity>({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String }
});

export const User = model<UserEntity>("User", userSchema);
