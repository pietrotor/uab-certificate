import IGeneric from '../interfaces/generic.interface';
import { Document, Model, Schema, model } from 'mongoose';

interface IProfession extends Document, IGeneric {
  _id: objectId;
  title: string;
  internalTitle: string;
  description?: string;
  last: string;
  level: string;
  code: string;
}

interface IModelProfession extends Model<IProfession> {}

const professionSchema = new Schema<IProfession>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    internalTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    last: {
      type: String,
    },
    level: {
      type: String,
    },
    code: {
      type: String,
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

const Profession = model<IProfession, IModelProfession>('Profession', professionSchema, 'professions');

export { Profession, IModelProfession, IProfession };
