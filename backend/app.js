import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';

const app = express();

// Node Global Error Handlers
process.on('uncaughtException', exception => {
  console.error('Uncaught Exception: ', exception.stack);
});

process.on('unhandledRejection', exception => {
  console.error(`Unhandled Promise Rejection: ${exception.stack}`);
});

app.use(helmet());
app.use(cors());

// Routers for each API endpoint
// app.use('/api/endpoints', routers);

// Express Global Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).send('Something went wrong.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));