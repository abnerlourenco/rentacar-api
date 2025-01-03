import express, { type NextFunction, type Request, type Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import 'dotenv/config';

import '../typeorm';
import '../../container';

import upload from '../../../config/upload';
import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  response.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`
  });

  next();
});

export { app };
