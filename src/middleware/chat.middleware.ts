import { connections } from '../interface/interface.connection';
import { LiveIntentResponse } from '../interface/interface.intent';

const sendMessage = (uid: string, response: LiveIntentResponse) => {
    if (connections[uid]) {
        connections[uid].send(JSON.stringify(response));
    }
};

export { sendMessage };
