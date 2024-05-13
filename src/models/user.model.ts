import IGeneric from '../interfaces/generic.interface';
import { Document, Model, Schema, model } from 'mongoose';

enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface IUser extends Document, IGeneric {
  _id: objectId;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleEnum;
  businessId: objectId;
}

interface IModelUser extends Model<IUser> {}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: RoleEnum,
    },
    // Generic Types
    status: { type: Boolean, default: true },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const User = model<IUser, IModelUser>('User', userSchema, 'user');

export { User, IModelUser, IUser, RoleEnum };
