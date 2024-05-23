import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserPayload } from '@/interfaces/global.interface';
dotenv.config();
export const currentUser = (req: Request, _: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    console.log('🚀 ~ process.env.JWT_KEY:', process.env.JWT_KEY);
    console.log('🚀 ~ req.headers.authorization:', req.headers.authorization);
    try {
      const payload = <UserPayload>jwt.verify(req.headers.authorization, process.env.JWT_KEY!);
      console.log(payload);
      req.currentUser = payload;
    } catch (error) {
      console.log('error currentUser', error);
    }
  }
  next();
};
