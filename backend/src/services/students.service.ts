import BadRequestError from '../errors/BadRequestError';
import { DocumentDto, GetByIdParmsDto, PaginationDto, StudentDto } from 'dtos';
import { StudentsRepository } from 'repositories';
import { IModelStudent, IStudent, Student } from '../models';
import { getInstancesPagination } from './generic.service';
import { professionCore } from './index';

export class StudentsService implements StudentsRepository {
  private async getUserByDocument(documentDto: DocumentDto) {
    const { businessId, identificationDocument } = documentDto;
    const userInstance = await Student.findOne({
      deleted: false,
      businessId,
      identificationDocument,
    });
    return userInstance;
  }

  async createStudent(studentDto: StudentDto) {
    const { businessId, identificationDocument, professionsIds } = studentDto;
    const existsUser = await this.getUserByDocument({ businessId, identificationDocument });
    if (existsUser)
      throw new BadRequestError({
        code: 400,
        message: 'Estudiante ya registrado con ese documento',
      });
    await Promise.all(
      professionsIds.map(async (profesionId) => {
        await professionCore.getProfessionById({
          businessId,
          id: profesionId,
        });
      }),
    );
    const userInstance = new Student(studentDto);
    return await userInstance.save();
  }

  async updateStudent(studentDto: StudentDto) {
    const studentUpdated = await Student.findOneAndUpdate(
      {
        _id: studentDto._id,
        deleted: false,
      },
      studentDto,
      { new: true },
    );

    return studentUpdated!;
  }

  async getStudentsByProfession(params: GetByIdParmsDto) {
    const { businessId, id } = params;
    const studentUpdated = await Student.find({
      deleted: false,
      professionsIds: { $in: [id] },
      businessId,
    }).populate(['professionsIds']);

    return studentUpdated;
  }

  async deleteStudent(id: objectId, businessId: objectId) {
    const studentInstance = await this.getStudentById({ id, businessId });
    studentInstance.deleted = true;
    studentInstance.deletedAt = new Date();

    return await studentInstance.save();
  }

  async getStudents(paginationDto: PaginationDto) {
    const { filter } = paginationDto;
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { lastName: { $regex: filter, $options: 'i' } },
          { studentCode: { $regex: filter, $options: 'i' } },
          { identificationDocument: { $regex: filter, $options: 'i' } },
        ],
      };
      return await getInstancesPagination<IStudent, IModelStudent>({
        db: Student,
        paginationInput: paginationDto,
        args: filterArgs,
      });
    }
    return await getInstancesPagination<IStudent, IModelStudent>({
      db: Student,
      paginationInput: paginationDto,
    });
  }

  async getStudentById(params: GetByIdParmsDto) {
    const { businessId, id } = params;
    const user = await Student.findOne({
      _id: id,
      deleted: false,
      businessId,
    });
    if (!user)
      throw new BadRequestError({
        code: 400,
        message: 'Estudiante no encontrado',
      });
    return user;
  }

  async removeProfessionFromStudents(params: GetByIdParmsDto) {
    const { businessId, id } = params;
    const updateResult = await Student.updateMany({ deleted: false, businessId, professionsIds: { $in: [id] } }, { $pull: { professionsIds: id } });

    return updateResult.modifiedCount;
  }

  async getMetrics() {
    const pipeline = [
      {
        $match: {
          deleted: false,
        },
      },
      {
        $unwind: '$professionsIds',
      },
      {
        $lookup: {
          from: 'professions',
          localField: 'professionsIds',
          foreignField: '_id',
          as: 'profession',
        },
      },
      {
        $unwind: '$profession',
      },
      {
        $group: {
          _id: '$profession.title',
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          profession: '$_id',
          total: 1,
        },
      },
    ];
    const metrics = await Student.aggregate<{ profession: string; total: number }>(pipeline);
    return metrics;
  }

  async getStudentsSorted() {
    const sorted = await Student.aggregate<any>([
      {
        $addFields: {
          fullName: { $concat: ['$name', ' ', '$lastName'] },
        },
      },
      { $sort: { fullName: 1 } },
    ]);
    return sorted;
  }
}
