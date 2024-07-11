import express from 'express';
import expressWs from 'express-ws';
import bodyParser from 'body-parser';
import { connections } from './middleware/chatbot.middleware';

const app = express();
expressWs(app);

app.use(bodyParser.json());

export { app, connections };
