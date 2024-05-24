import BadRequestError from '../errors/BadRequestError';
import { GetByIdParmsDto, PaginationDto, ProfessionDto } from 'dtos';
import { ProfessionsRepository } from 'repositories';
import { IModelProfession, IProfession, Profession } from '../models';
import { getInstancesPagination } from './generic.service';
import { studentCore } from '../services';

export class ProfessionsService implements ProfessionsRepository {
  private async getProfesionByTitle(title: string, businessId: objectId) {
    return await Profession.findOne({
      deleted: false,
      title,
      businessId,
    });
  }
  async createProfession(professionDto: ProfessionDto) {
    const { title, businessId } = professionDto;
    const existsProfession = await this.getProfesionByTitle(title, businessId);
    if (existsProfession)
      throw new BadRequestError({
        code: 400,
        message: 'Carrera ya registrado con es nombre público',
      });
    const userInstance = new Profession(professionDto);
    return await userInstance.save();
  }

  async updateProfession(professionDto: ProfessionDto) {
    const { title, businessId, _id } = professionDto;
    await this.getProfessionById({ businessId, id: _id! });
    const existsProfession = await this.getProfesionByTitle(title, businessId);

    if (existsProfession?._id?.toString() !== _id?.toString() && existsProfession)
      throw new BadRequestError({
        code: 400,
        message: 'Otra carrera ya tiene ese nombre',
      });
    const professionUpdated = await Profession.findOneAndUpdate(
      {
        _id: professionDto._id,
        deleted: false,
      },
      professionDto,
      { new: true },
    );

    return professionUpdated!;
  }

  async deleteProfession(id: objectId, businessId: objectId) {
    const professionInstance = await this.getProfessionById({ businessId, id });
    await studentCore.removeProfessionFromStudents({
      businessId,
      id,
    });
    professionInstance.deleted = true;
    professionInstance.deletedAt = new Date();

    return await professionInstance.save();
  }

  async getProfessions(paginationDto: PaginationDto) {
    const { filter } = paginationDto;
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { lastName: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } },
        ],
      };
      return await getInstancesPagination<IProfession, IModelProfession>({
        db: Profession,
        paginationInput: paginationDto,
        args: filterArgs,
      });
    }
    return await getInstancesPagination<IProfession, IModelProfession>({
      db: Profession,
      paginationInput: paginationDto,
    });
  }

  async getProfessionById(params: GetByIdParmsDto) {
    const { businessId, id } = params;
    const user = await Profession.findOne({
      _id: id,
      deleted: false,
      businessId,
    });
    if (!user)
      throw new BadRequestError({
        code: 400,
        message: 'Carrera no encontrado',
      });
    return user;
  }
}
