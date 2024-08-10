import { Express } from 'express';
import homeRouter from '../routers/home';

export default function routes(app: Express) {
  app.use('/api', homeRouter);
}