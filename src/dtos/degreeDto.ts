interface DegreeDto {
  _id?: objectId;
  studentId: objectId;
  professionId: objectId;
  title: string;
  level: string;
  issueDate: Date;
  businessId: objectId;
  createdBy: objectId;
}

export type { DegreeDto };
