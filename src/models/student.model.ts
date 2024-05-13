import IGeneric from '../interfaces/generic.interface';
import { Document, Model, Schema, model } from 'mongoose';

interface IStudent extends Document, IGeneric {
  _id: objectId;
  name: string;
  lastName: string;
  identificationDocument: string;
  complement: string;
  studentCode: string;
  birthdate?: Date;
  professionsIds: objectId[];
}

interface IModelStudent extends Model<IStudent> {}

const studentSchema = new Schema<IStudent>(
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
    identificationDocument: {
      type: String,
      unique: true,
      index: true,
    },
    complement: {
      type: String,
    },
    studentCode: {
      type: String,
      unique: true,
    },
    professionsIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profession',
        index: true,
      },
    ],
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

const Student = model<IStudent, IModelStudent>('Student', studentSchema, 'students');

export { Student, IModelStudent, IStudent };
