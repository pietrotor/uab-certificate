interface PaginationDto {
  page?: number;
  rows?: number;
  filter?: string;
}

interface GetByIdParmsDto {
  id: objectId;
  businessId: objectId;
}

export type { PaginationDto, GetByIdParmsDto };
