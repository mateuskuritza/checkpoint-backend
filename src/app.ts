import cors from 'cors';
import express from 'express';
import { router } from './infra/http/routes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export { app };
