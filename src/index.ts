import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { connectToDatabase } from './databaseConnection';

import { apiDocumentation } from './docs/apidoc';
import { errorHandler } from '@/middlewares/errorHandler';
import BadRequestError from './errors/BadRequestError';
import { professionsRoute, studentsRoute, userRoute } from './routes';
import cors from 'cors';
import { currentUser } from './middlewares';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4000');

const app = express();
app.set('trust proxy', true);
app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(currentUser);

app.use('/api', userRoute());
app.use('/api', studentsRoute());
app.use('/api', professionsRoute());
app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.get('/', (_, res) => {
  return res.json({ message: 'Hello World!' });
});

app.use(() => {
  throw new BadRequestError({
    code: 404,
    message: 'Route not found',
    context: {
      path: 'Invalid route',
    },
  });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log('*******************************');
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
  console.log('*******************************');
});
