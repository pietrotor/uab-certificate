import { Document, Model, ProjectionType, QueryOptions } from 'mongoose';
import { IPagination } from '../interfaces';

type GetInstancesPaginationParams<T, S> = {
  db: T;
  paginationInput: IPagination;
  args?: object;
  populate?: string[];
  projection?: ProjectionType<S> | null | undefined;
  options?: QueryOptions<S> | null | undefined;
};

export const getInstancesPagination = async <S extends Document, T extends Model<S>>({
  db,
  paginationInput,
  args,
  populate = [],
  projection = {},
}: GetInstancesPaginationParams<T, S>) => {
  const rows = paginationInput.rows || 20;
  const page = paginationInput.page || 1;
  const searchArgs: object = {
    deleted: false,
    ...(args || {}),
  };
  console.time('counter');
  const totalDocuments = await db.find(searchArgs).countDocuments();
  console.timeEnd('counter');
  const totalPages = Math.ceil(totalDocuments / rows);
  if (totalPages === 0) {
    return {
      data: [],
      totalRecords: totalDocuments,
      totalPages,
      rows,
      currentPage: page,
    };
  }
  if (page > totalPages) {
    return {
      data: [],
      message: 'The page does not exits',
      totalRecords: totalDocuments,
      totalPages,
      rows,
      currentPage: page,
    };
  }
  if (page === 1) {
    const documents = await db.find(searchArgs, projection).sort({ _id: -1 }).limit(rows).populate(populate);
    return {
      data: documents,
      message: 'Registers found',
      totalRecords: totalDocuments,
      totalPages,
      rows,
      currentPage: page,
    };
  }
  const skipPages = (page - 1) * rows;
  const documents = await db.find(searchArgs, projection).sort({ _id: -1 }).skip(skipPages).limit(rows).populate(populate);
  return {
    data: documents,
    message: 'Registers found',
    totalRecords: totalDocuments,
    totalPages,
    rows,
    currentPage: page,
  };
};
