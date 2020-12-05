import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333!');
});
