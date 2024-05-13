interface ProfessionDto {
  _id?: objectId;
  title: string;
  internalTitle: string;
  description?: string;
  last: number;
  level: string;
  code: string;
  businessId: objectId;
  createdBy?: objectId;
}

export type { ProfessionDto };
