import { WebSocket } from 'ws';

interface Connections {
    [uid: string]: WebSocket;
}

const connections: Connections = {};

export { connections };

export interface LiveChatMessage {
    from: string;
    message: string;
}