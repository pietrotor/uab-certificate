import { NextFunction, Response, Request } from 'express';
import { IRequest } from '../interfaces';
import { ProfessionDto } from 'dtos';
import { professionCore } from 'services';

export class ProfessionController {
  public create = async (req: IRequest<ProfessionDto>, res: Response, next: NextFunction) => {
    try {
      const professionDto = req.body;
      const professionInstance = await professionCore.createProfession({
        ...professionDto,
        createdBy: req.currentUser.id,
        businessId: req.currentUser.businessId,
      });
      return res.status(200).send(professionInstance);
    } catch (error) {
      console.log('🚀 ~ ProfessionController ~ create= ~ error:', error);
      next(error);
    }
  };

  public update = async (req: IRequest<ProfessionDto>, res: Response, next: NextFunction) => {
    try {
      console.log('--- profession');
      const { professionId } = req.params;
      const professionDto = req.body;
      const professionInstance = await professionCore.updateProfession({
        ...professionDto,
        _id: professionId as unknown as objectId,
        businessId: req.currentUser.businessId,
      });
      return res.status(200).send(professionInstance);
    } catch (error) {
      console.log('🚀 ~ ProfessionController ~ update= ~ error:', error);
      next(error);
    }
  };

  public delete = async (req: IRequest<ProfessionDto>, res: Response, next: NextFunction) => {
    try {
      const { professionId } = req.params;
      const professionInstance = await professionCore.deleteProfession(professionId as unknown as objectId, req.currentUser?.businessId!);
      return res.status(200).send(professionInstance);
    } catch (error) {
      console.log('🚀 ~ ProfessionController ~ update= ~ error:', error);
      next(error);
    }
  };

  public getProfessions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationDto = req.query;
      const studentsInstances = await professionCore.getProfessions(paginationDto);
      return res.status(200).send(studentsInstances);
    } catch (error) {
      console.log('🚀 ~ ProfessionController ~ getProfessions= ~ error:', error);
      next(error);
    }
  };

  public getProfession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { professionId } = req.params;
      console.log('🚀 ~ ProfessionController ~ create= ~ req.currentUser:', req.currentUser);
      const professionInstance = await professionCore.getProfessionById({
        id: professionId as unknown as objectId,
        businessId: req.currentUser?.businessId!,
      });

      return res.status(200).send(professionInstance);
    } catch (error) {
      console.log('🚀 ~ ProfessionController ~ getProfession= ~ error:', error);
      next(error);
    }
  };
}
