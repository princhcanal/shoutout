import App from './app';
import 'dotenv/config';
import mongoose from 'mongoose';
import { validateEnv } from './utils/validateEnv';
import PostController from './controllers/post.controller';

validateEnv();

const port = parseInt(process.env.PORT as string) || 5000;

const app = new App([new PostController()], port);

app.listen();
