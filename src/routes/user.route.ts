import { Router } from 'express';
import { UserController } from 'controllers';
import { validateRequest } from '@/middlewares/validate-request';
import { body, check } from 'express-validator';

const userRoute = () => {
  const router = Router();
  const userController = new UserController();

  router.post(
    '/users/login',
    [body('email').notEmpty().withMessage('name is required'), body('password').trim().notEmpty().withMessage('password is required')],
    validateRequest,
    userController.login,
  );

  router.post(
    '/users',
    [
      body('name').notEmpty().withMessage('name is required'),
      body('lastName').trim().notEmpty().withMessage('lastName is required'),
      body('email').trim().notEmpty().withMessage('email is required'),
      body('password').trim().notEmpty().withMessage('password is required'),
      body('role').trim().notEmpty().withMessage('role is required'),
    ],
    validateRequest,
    userController.create,
  );

  router.patch(
    '/users/:userId',
    [
      body('name').notEmpty().withMessage('name is required'),
      body('lastName').trim().notEmpty().withMessage('lastName is required'),
      body('email').trim().notEmpty().withMessage('email is required'),
      body('password').trim().notEmpty().withMessage('password is required'),
      body('role').trim().notEmpty().withMessage('role is required'),
    ],
    validateRequest,
    userController.update,
  );

  router.get(
    '/users',
    [
      check('page').optional().isNumeric().withMessage('page must be a number'),
      check('rows').optional().isNumeric().withMessage('rows must be a number'),
      check('filter').optional(),
    ],
    validateRequest,
    userController.getUsers,
  );

  router.get('/users/current_user', userController.currentUser);

  return router;
};

export { userRoute };
