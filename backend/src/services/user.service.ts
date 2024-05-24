import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/BadRequestError';
import { Password } from '../lib/encrypt';
import { IModelUser, IUser, User } from '../models/index';
import { GetByIdParmsDto, LoginDto, PaginationDto, UserByEmailParamsDto, UserDto } from 'dtos';
import { getInstancesPagination } from './generic.service';

const createUser = async (userDto: UserDto, createdBy?: objectId) => {
  const existingUser = await User.findOne({
    deleted: false,
    email: userDto.email,
    businessId: userDto.businessId,
  });
  if (existingUser) {
    throw new BadRequestError({
      code: 400,
      message: `El usuario con el email ${userDto.email} ya esta registrado`,
    });
  }
  const passHashed = await Password.toHash(userDto.password);

  const newUser = new User({
    ...userDto,
    password: passHashed,
    createdBy,
  });
  return await newUser.save();
};

const updateUser = async (userDto: UserDto) => {
  await getUserById({ businessId: userDto.businessId, id: userDto._id });
  const userUpdated = await User.findOneAndUpdate(
    {
      _id: userDto._id,
      deleted: false,
    },
    userDto,
  );

  return userUpdated;
};

const getUserById = async (params: GetByIdParmsDto) => {
  const { businessId, id } = params;
  const user = await User.findOne({
    _id: id,
    deleted: false,
    businessId,
  });
  if (!user)
    throw new BadRequestError({
      code: 400,
      message: 'Usuario no encontrado',
    });
  return user;
};

const getUserByEmail = async (params: UserByEmailParamsDto) => {
  const { email } = params;
  const user = await User.findOne({
    deleted: false,
    email,
    status: true,
  });
  if (!user)
    throw new BadRequestError({
      code: 400,
      message: 'Usuario no encontrado',
    });
  return user;
};

const validatePassowrdAndGenerateJWT = async (password: string, user: IUser) => {
  const passwordsMatch = await Password.compare(user.password, password);
  if (!passwordsMatch) {
    throw new BadRequestError({
      code: 401,
      message: 'malos credenciales',
    });
  }
  const userJwt = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name + ' ' + user.lastName,
      businessId: user.businessId,
    },
    process.env.JWT_KEY!,
  );
  console.log('jwt', userJwt);
  console.log('------------------------------------------------------');

  return userJwt;
};

const loginUser = async (loginDto: LoginDto) => {
  const { email, password } = loginDto;
  const user = await getUserByEmail({ email });
  if (!user) {
    throw new BadRequestError({
      code: 400,
      message: 'El usuario no existe',
    });
  }
  const userJwt = await validatePassowrdAndGenerateJWT(password, user);

  return userJwt;
};

const getUsersPaginated = async (paginationInput: PaginationDto) => {
  // const business = new Business({
  //   name: 'Instituto ICEPAL',
  //   nit: '1008885025',
  //   code: 'ins-icepal',
  //   socialReason: 'Instituto técnico ICEPAL',
  //   address: 'Av. Heroinas esquina Hamiraya, edificio Felmar',
  //   city: 'Cochabamba',
  // })
  // await business.save()
  const { filter } = paginationInput;
  if (filter) {
    const filterArgs = {
      $or: [
        { name: { $regex: filter, $options: 'i' } },
        { lastName: { $regex: filter, $options: 'i' } },
        { code: { $regex: filter, $options: 'i' } },
      ],
    };
    return await getInstancesPagination<IUser, IModelUser>({
      db: User,
      paginationInput,
      args: filterArgs,
    });
  }
  const users = await getInstancesPagination<IUser, IModelUser>({
    db: User,
    paginationInput,
  });
  return users;
};

export { createUser, updateUser, getUserById, getUsersPaginated, loginUser };
