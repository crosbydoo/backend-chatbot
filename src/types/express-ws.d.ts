import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import * as WebSocket from 'ws';

declare global {
    namespace Express {
        interface Application {
            ws: (route: string, handler: (ws: WebSocket, req: express.Request) => void) => void;
        }
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload;
    }
}
