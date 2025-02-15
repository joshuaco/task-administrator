import mongoose, { Document, ObjectId } from 'mongoose';

export type TokenType = Document & {
  token: string;
  user: ObjectId;
  createdAt: Date;
};

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m'
  }
});

const Token = mongoose.model<TokenType>('Token', TokenSchema);

export default Token;
