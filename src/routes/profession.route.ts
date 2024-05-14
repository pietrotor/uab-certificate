import { Router } from 'express';
import { ProfessionController, StudentController } from 'controllers';
import { validateRequest } from '@/middlewares/validate-request';
import { body, check } from 'express-validator';

const professionsRoute = () => {
  const router = Router();
  const professionController = new ProfessionController();
  const studentController = new StudentController();

  router.post(
    '/professions',
    [
      body('title').notEmpty().withMessage('title is required'),
      body('internalTitle').trim().notEmpty().withMessage('internalTitle is required'),
      body('last').trim().notEmpty().withMessage('last is required'),
      body('level').trim().notEmpty().withMessage('level is required'),
      body('code').trim().notEmpty().withMessage('code is required'),
    ],
    validateRequest,
    professionController.create,
  );

  router.patch(
    '/professions/:professionId',
    [
      body('_id').notEmpty().withMessage('_id is required'),
      body('title').notEmpty().withMessage('title is required'),
      body('internalTitle').trim().notEmpty().withMessage('internalTitle is required'),
      body('last').trim().notEmpty().withMessage('last is required'),
      body('level').trim().notEmpty().withMessage('level is required'),
      body('code').trim().notEmpty().withMessage('code is required'),
    ],
    validateRequest,
    professionController.update,
  );

  router.delete('/professions/:professionId', professionController.delete);

  router.get(
    '/professions',
    [
      check('page').optional().isNumeric().withMessage('page must be a number'),
      check('rows').optional().isNumeric().withMessage('rows must be a number'),
      check('filter').optional(),
    ],
    validateRequest,
    professionController.getProfessions,
  );

  router.get('/professions/:professionId', professionController.getProfession);
  router.get('/professions/:professionId/students', studentController.getStudentsByProfessions);

  return router;
};

export { professionsRoute };
