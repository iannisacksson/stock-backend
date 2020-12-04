import { Router, Request, Response } from 'express';

const routes = Router();

routes.post('/users', (request: Request, response: Response) => {
  console.log(request.body);
  const { name, email, password } = request.body;

  const user = { name, email, password };

  return response.status(200).json(user);
});

export default routes;
