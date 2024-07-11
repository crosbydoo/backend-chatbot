import { Intent, IntentResponse, LiveIntentResponse } from '../interface/interface.intent';



const intents: Intent[] = require('../data/intents.json');

export function getResponse(message: string): IntentResponse {
    const words = message.toLowerCase().split(' ');

    for (const intent of intents) {
        if (intent.patterns.some(pattern => {
            const patternWords = pattern.toLowerCase().split(' ');
            return patternWords.every(word => words.includes(word));
        })) {
            const responseIndex = Math.floor(Math.random() * intent.responses.length);
            return intent.responses[responseIndex];
        }
    }

    return {
        message: "Sorry, I don't understand.",
        type_bubble: "bubble"
    };
}

export function getLiveChatResponse(message: string): LiveIntentResponse {
    return {
        message: `You said: ${message}`,
        type_bubble: "bubble"
    };
}