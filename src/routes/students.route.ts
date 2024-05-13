import { Router } from 'express';
import { StudentController } from 'controllers';
import { validateRequest } from '@/middlewares/validate-request';
import { body, check } from 'express-validator';

const studentsRoute = () => {
  const router = Router();
  const studentController = new StudentController();

  router.post(
    '/students',
    [
      body('name').notEmpty().withMessage('name is required'),
      body('lastName').trim().notEmpty().withMessage('lastName is required'),
      body('identificationDocument').trim().notEmpty().withMessage('identificationDocument is required'),
      body('complement').trim(),
      body('professionsIds').isArray().notEmpty().withMessage('professionsIds is required'),
    ],
    validateRequest,
    studentController.create,
  );

  router.patch(
    '/students/:studentId',
    [
      body('_id').notEmpty().withMessage('_id is required'),
      body('name').notEmpty().withMessage('name is required'),
      body('lastName').trim().notEmpty().withMessage('lastName is required'),
      body('identificationDocument').trim().notEmpty().withMessage('identificationDocument is required'),
      body('complement').trim(),
      body('professionsIds').isArray().notEmpty().withMessage('professionsIds is required'),
    ],
    validateRequest,
    studentController.update,
  );

  router.delete('/students/:studentId', studentController.delete);

  router.get(
    '/students',
    [
      check('page').optional().isNumeric().withMessage('page must be a number'),
      check('rows').optional().isNumeric().withMessage('rows must be a number'),
      check('filter').optional(),
    ],
    validateRequest,
    studentController.getUsers,
  );

  router.get('/students/:studentId', studentController.getUser);
  router.get('/students/:studentId/degrees', studentController.getDegrees);

  return router;
};

export { studentsRoute };
