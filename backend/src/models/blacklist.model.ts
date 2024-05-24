import IGeneric from '../interfaces/generic.interface';
import { Document, Model, Schema, model } from 'mongoose';

interface IBlackList extends Document, IGeneric {
  _id: objectId;
  token: string;
}

interface IModelBlackList extends Model<IBlackList> {}

const blackListSchema = new Schema<IBlackList>(
  {
    token: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

const BlackList = model<IBlackList, IModelBlackList>('BlackList', blackListSchema, 'blackList');

export { BlackList, IModelBlackList, IBlackList };
