import { RoleEnum } from '@/models/index';

interface UserDto {
  _id: objectId;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleEnum;
  country: string;
  businessId: objectId;
}

interface LoginDto {
  email: string;
  password: string;
}

interface UserByEmailParamsDto {
  email: string;
}

export type { UserDto, LoginDto, UserByEmailParamsDto };
