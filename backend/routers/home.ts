import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  response.send('Welcome to the Assistonto API');
});

export default router;