interface StudentDto {
  _id?: objectId;
  name: string;
  lastName: string;
  identificationDocument: string;
  complement: string;
  birthdate: Date;
  professionsIds: objectId[];
  createdBy?: objectId;
  businessId: objectId;
}

interface DocumentDto {
  identificationDocument: string;
  businessId: objectId;
}

export type { StudentDto, DocumentDto };
