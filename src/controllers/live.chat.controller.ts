import { app } from '../app';
import { connections } from '../interface/interface.connection';

interface WebSocketMessage {
    from: string;
    message: string;
}

app.ws('/livechat/:uid', (ws, req) => {
    const { uid } = req.params;
    connections[uid] = ws;

    console.log(`Live chat WebSocket connected for user ${uid}`);

    ws.on('message', (msg: string) => {
        console.log(`Received message from user ${uid}: ${msg}`);

        let message: string;
        let data: WebSocketMessage = { from: '', message: '' };

        try {
            data = JSON.parse(msg);
            message = data.message;
        } catch (error) {
            message = msg;
        }

        const user_type = (uid === data.from) ? "sender" : "receiver";

        // Relay message to other users
        Object.keys(connections).forEach((userUid) => {
            if (userUid !== uid && connections[userUid].readyState === ws.OPEN) {
                connections[userUid].send(JSON.stringify({ from: data.from, user_type, message }));
            }
        });
    });

    // Handle close event
    ws.on('close', () => {
        delete connections[uid];
        console.log(`Live chat WebSocket closed for user ${uid}`);

        // Attempt to reconnect WebSocket after 5 seconds
        setTimeout(() => {
            console.log(`Attempting to reconnect WebSocket for user ${uid}...`);
            app.ws(`/livechat/${uid}`, (newWs) => {
                console.log(`Reconnected WebSocket for user ${uid}`);
                connections[uid] = newWs;
            });
        }, 5000);
    });

    // Handle WebSocket errors
    ws.on('error', (error) => {
        console.error(`WebSocket error for user ${uid}: ${error.message}`);
    });
});
