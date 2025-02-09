import mongoose, { Document } from 'mongoose';

export type UserType = Document & {
  name: string;
  email: string;
  password: string;
  confirmed: boolean;
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model<UserType>('User', UserSchema);

export default User;
