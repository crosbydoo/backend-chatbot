import { WebSocket } from 'ws';
import { IntentResponse } from '../interface/interface.intent';

const connections: { [uid: number]: WebSocket } = {};

export function sendMessage(uid: number, response: IntentResponse): void {
    const ws = connections[uid];
    if (ws) {
        const respond_id = generateRespondId();
        const message = {
            uid: uid,
            ...response,
            datetime: new Date(),
            respond_id: respond_id,
        };
        ws.send(JSON.stringify(message), (error) => {
            if (error) {
                console.error(`Error sending message to user ${uid}: ${error.message}`);

            }
        });
    } else {
        console.error(`No WebSocket connection found for user ${uid}`);

    }
}

function generateRespondId(): string {
    return Math.random().toString(36).substring(2, 9);
}

export { connections };
