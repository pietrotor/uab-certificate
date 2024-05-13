import BadRequestError from '@/errors/BadRequestError';
import { IStudent } from '@/models/index';
import { DocumentDto, GetByIdParmsDto, PaginationDto, StudentDto } from 'dtos';
import { PaginationResponse } from '../interfaces';

export abstract class StudentsRepository {
  abstract createStudent(studentDto: StudentDto): Promise<IStudent | BadRequestError>;
  abstract updateStudent(studentDto: StudentDto): Promise<IStudent | BadRequestError>;
  abstract deleteStudent(id: objectId, businessId: objectId): Promise<IStudent | BadRequestError>;

  abstract removeProfessionFromStudents(params: GetByIdParmsDto): Promise<number>;

  abstract getStudents(paginationDto: PaginationDto): Promise<PaginationResponse<IStudent> | BadRequestError>;
  abstract getStudentById(params: GetByIdParmsDto): Promise<IStudent | BadRequestError>;
}
