export default interface IGeneric {
  status: boolean;
  businessId: objectId;
  createdBy: objectId;
  deleted: boolean;
  deletedAt?: Date;
  deletedBy?: objectId;
  createdAt: Date;
}

export interface IPagination {
  page?: number;
  rows?: number;
  filter?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  message?: string;
  totalRecords: number;
  totalPages: number;
  rows: number;
  currentPage: number;
}
