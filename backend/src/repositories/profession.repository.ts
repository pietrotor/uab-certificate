import BadRequestError from '../errors/BadRequestError';
import { IProfession } from '@/models/index';
import { GetByIdParmsDto, PaginationDto, ProfessionDto } from 'dtos';
import { PaginationResponse } from '../interfaces';

export abstract class ProfessionsRepository {
  abstract createProfession(professionDto: ProfessionDto): Promise<IProfession | BadRequestError>;
  abstract updateProfession(professionDto: ProfessionDto): Promise<IProfession | BadRequestError>;
  abstract deleteProfession(id: objectId, businessId: objectId): Promise<IProfession | BadRequestError>;

  abstract getProfessions(paginationDto: PaginationDto): Promise<PaginationResponse<IProfession> | BadRequestError>;
  abstract getProfessionById(params: GetByIdParmsDto): Promise<IProfession | BadRequestError>;
}
