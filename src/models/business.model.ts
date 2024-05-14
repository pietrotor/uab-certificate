import IGeneric from '../interfaces/generic.interface';
import { Document, Model, Schema, model } from 'mongoose';

interface IBusiness extends Document, IGeneric {
  _id: objectId;
  name: string;
  nit: string;
  code: string;
  socialReason: string;
  address: string;
  city: string;
  web?: string;
  logo?: string;
  s3BucketUrl?: string;
  ministerialResolution?: string;
  administrationResolution?: string;
}

interface IModelBusiness extends Model<IBusiness> {}

const businessSchema = new Schema<IBusiness>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nit: {
      type: String,
    },
    socialReason: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    web: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    s3BucketUrl: {
      type: String,
      default: null,
    },
    ministerialResolution: {
      type: String,
      default: null,
    },
    administrationResolution: {
      type: String,
      default: null,
    },
    // Generic Types
    status: { type: Boolean, default: true },
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

const Business = model<IBusiness, IModelBusiness>('Business', businessSchema, 'business');

export { Business, IModelBusiness, IBusiness };
