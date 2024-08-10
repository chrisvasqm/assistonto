import cors from 'cors';
import 'dotenv/config';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import routes from './startup/routes';

const app = express();

// Node Global Error Handlers
process.on('uncaughtException', (exception: Error) => {
  console.error('Uncaught Exception: ', exception.stack);
});

process.on('unhandledRejection', (exception: Error) => {
  console.error(`Unhandled Promise Rejection: ${exception.stack}`);
});

app.use(helmet());
app.use(cors());

// Routers for each API endpoint
routes(app);

// Express Global Error Middleware
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error.stack);

  response.status(500).send('Something went wrong.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));