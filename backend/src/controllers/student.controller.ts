import { NextFunction, Response, Request } from 'express';
import { IRequest } from '../interfaces';
import { StudentDto } from 'dtos';
import { studentCore } from '../services';

export class StudentController {
  public create = async (req: IRequest<StudentDto>, res: Response, next: NextFunction) => {
    try {
      const studentDto = req.body;
      const studentInstance = await studentCore.createStudent({
        ...studentDto,
        createdBy: req.currentUser?.id,
        businessId: req.currentUser!.businessId,
      });
      return res.status(200).send(studentInstance);
    } catch (error) {
      console.log('🚀 ~ StudentController ~ create= ~ error:', error);
      next(error);
    }
  };

  public update = async (req: IRequest<StudentDto>, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      console.log('🚀 ~ StudentController ~ update= ~ studentId:', studentId);
      const studentDto = req.body;
      const studentInstance = await studentCore.updateStudent({ ...studentDto, _id: studentId as unknown as objectId });
      return res.status(200).send(studentInstance);
    } catch (error) {
      console.log('🚀 ~ StudentController ~ update= ~ error:', error);
      next(error);
    }
  };

  public delete = async (req: IRequest<StudentDto>, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      const studentInstance = await studentCore.deleteStudent(studentId as unknown as objectId, req.currentUser?.businessId!);
      return res.status(200).send(studentInstance);
    } catch (error) {
      console.log('🚀 ~ StudentController ~ update= ~ error:', error);
      next(error);
    }
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationDto = req.query;
      const studentsInstances = await studentCore.getStudents(paginationDto);
      return res.status(200).send(studentsInstances);
    } catch (error) {
      console.log('🚀 ~ StudentController ~ getUsers= ~ error:', error);
      next(error);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      const studentInstance = await studentCore.getStudentById({
        id: studentId as unknown as objectId,
        businessId: req.currentUser?.businessId!,
      });
      return res.status(200).send(studentInstance);
    } catch (error) {
      console.log('🚀 ~ StudentController ~ getUsers= ~ error:', error);
      next(error);
    }
  };

  public getStudentsByProfessions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { professionId } = req.params;
      const studentInstance = await studentCore.getStudentsByProfession({
        id: professionId as unknown as objectId,
        businessId: req.currentUser?.businessId!,
      });
      return res.status(200).send(studentInstance);
    } catch (error) {
      console.log('🚀 ~ StudentController ~ getUsers= ~ error:', error);
      next(error);
    }
  };

  public getMetricts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentInstance = await studentCore.getMetrics();
      return res.status(200).send(studentInstance);
    } catch (error) {
      console.log('🚀 ~ StudentController ~ getUsers= ~ error:', error);
      next(error);
    }
  };

  public sorted = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentInstance = await studentCore.getStudentsSorted();
      return res.status(200).send(studentInstance);
    } catch (error) {
      console.log('🚀 ~ StudentController ~ getUsers= ~ error:', error);
      next(error);
    }
  };
}
