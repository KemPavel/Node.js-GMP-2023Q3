import { Schema, model } from 'mongoose';

export interface UserEntity {
  id: string;
}

const userSchema = new Schema<UserEntity>({
  id: { type: String, required: true }
});

export const User = model<UserEntity>("User", userSchema);

// const admin = new User({
//   id: 'admin'
// });
