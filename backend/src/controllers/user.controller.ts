import { NextFunction, Response, Request } from 'express';
import { IRequest } from '../interfaces';
import { LoginDto, UserDto } from 'dtos';
import { createUser, getUserById, getUsersPaginated, loginUser, updateUser } from '../services';
import BadRequestError from '../errors/BadRequestError';
import { BlackList } from '../models';

export class UserController {
  public login = async (req: IRequest<LoginDto>, res: Response, next: NextFunction) => {
    try {
      const loginDto = req.body;
      const jwtInstance = await loginUser(loginDto);
      return res.status(200).send({
        toke: jwtInstance,
      });
    } catch (error) {
      console.log('🚀 ~ UserController ~ login= ~ error:', error);
      next(error);
    }
  };

  public logOut = async (req: IRequest<any>, res: Response, next: NextFunction) => {
    try {
      const token = req.currentUser.token;
      const newToken = new BlackList({
        token,
      });
      await newToken.save();
      return res.status(200).send({
        message: 'User sesion deleted',
      });
    } catch (error) {
      console.log('🚀 ~ UserController ~ login= ~ error:', error);
      next(error);
    }
  };

  public create = async (req: IRequest<UserDto>, res: Response, next: NextFunction) => {
    try {
      const userDto = req.body;
      const userInstance = await createUser(userDto, req.currentUser?.id);
      return res.status(200).send(userInstance);
    } catch (error) {
      console.log('🚀 ~ UserController ~ create= ~ error:', error);
      next(error);
    }
  };

  public update = async (req: IRequest<UserDto>, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const userDto = req.body;
      const userInstance = await updateUser({ ...userDto, _id: userId as unknown as objectId });
      return res.status(200).send(userInstance);
    } catch (error) {
      console.log('🚀 ~ UserController ~ create= ~ error:', error);
      next(error);
    }
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationDto = req.query;
      const usersInstances = await getUsersPaginated(paginationDto);
      return res.status(200).send(usersInstances);
    } catch (error) {
      console.log('🚀 ~ UserController ~ getUsers= ~ error:', error);
      next(error);
    }
  };

  public currentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { businessId, id } = req.currentUser || {};
      console.log('🚀 ~ UserController ~ currentUser= ~ req.currentUser:', req.currentUser);
      if (!businessId || !id)
        throw new BadRequestError({
          code: 401,
          message: 'Usuario no encontrado',
        });
      const usersInstances = await getUserById({ businessId, id });
      return res.status(200).send(usersInstances);
    } catch (error) {
      console.log('🚀 ~ UserController ~ getUsers= ~ error:', error);
      next(error);
    }
  };
}
