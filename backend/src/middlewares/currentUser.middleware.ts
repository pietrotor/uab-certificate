import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserPayload } from '@/interfaces/global.interface';
import { BlackList } from '../models';
import BadRequestError from '../errors/BadRequestError';
dotenv.config();
export const currentUser = async (req: Request, _: Response, next: NextFunction) => {
  console.log('------------ ACA ----------', req.headers.authorization);
  if (req.headers.authorization) {
    console.log('🚀 ~ process.env.JWT_KEY:', process.env.JWT_KEY);
    try {
      const payload = <UserPayload>jwt.verify(req.headers.authorization, process.env.JWT_KEY!);
      const isInBlackList = await BlackList.findOne({
        token: req.headers.authorization,
      });
      console.log('🚀 ~ currentUser ~ isInBlackList:', isInBlackList);
      if (isInBlackList) {
        throw new BadRequestError({
          code: 401,
          message: 'Token no valido',
        });
      }
      req.currentUser = { ...payload };
    } catch (error) {
      console.log('error currentUser', error);
    }
  }
  next();
};
