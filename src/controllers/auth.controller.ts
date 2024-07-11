import { Request, Response } from 'express';
import { users } from '../interface/interface.user';
import { app, connections } from '../app';
import { sendMessage } from '../middleware/chatbot.middleware';
import { getResponse } from '../services/intent.service';
import { IntentResponse } from '../interface/interface.intent';

app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && user.password === password) {
        res.json({ uid: user.uid });

        app.ws(`/chat/${user.uid}`, (ws, req) => {
            connections[user.uid] = ws;

            const greetingResponse: IntentResponse = {
                message: "Hello! How can I assist you?",
                type_bubble: "bubble"
            };
            sendMessage(user.uid, greetingResponse);

            // Log when WebSocket is connected
            console.log(`WebSocket connected for user ${user.uid}`);

            // Send a ping every 30 seconds to keep the connection alive
            const interval = setInterval(() => {
                if (ws.readyState === ws.OPEN) {
                    ws.ping(); // Send a ping to keep the connection alive
                    console.log(`Sent ping to user ${user.uid}`);
                }
            }, 30000); // Send ping every 30 seconds

            ws.on('message', (msg: string) => {
                console.log(`Received message from user ${user.uid}: ${msg}`);

                let message: string;
                try {
                    const data = JSON.parse(msg);
                    message = data.message;
                } catch (error) {
                    message = msg;
                }

                const response = getResponse(message);
                sendMessage(user.uid, response);
            });

            ws.on('close', () => {
                clearInterval(interval); // Stop the interval when the connection is closed
                delete connections[user.uid];
                console.log(`WebSocket closed for user ${user.uid}`);
            });

            ws.on('error', (error) => {
                console.error(`WebSocket error for user ${user.uid}: ${error.message}`);
                clearInterval(interval); // Stop the interval if an error occurs
            });
        });
    } else {
        res.status(401).send('Login gagal');
    }
});
