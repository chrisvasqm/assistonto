import { Express } from 'express';
import homeRouter from '../routers/home';
import appointmentRouter from '../routers/appointment';

export default function routes(app: Express) {
  app.use('/api', homeRouter);
  app.use('/api/appointments', appointmentRouter);
}