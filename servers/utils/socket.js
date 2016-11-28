import IO from 'koa-socket';
import auth from '../auth';
import rabbit from './rabbitmq';

export class CmdbEvents {
    constructor(socket) {
        this.socket = socket;
        this.getEvents();
    }

    async getEvents() {
        let result = await rabbit.getQueue('commdone.data', {});

        // await result.ch.bindQueue(result.q.queue, "amq.topic", `${result.q.queue}.bodys`);
        await result.ch.prefetch(1);

        await result.ch.consume(result.q.queue, (msg) => {
            let commandResult = JSON.parse(msg.content.toString());

            this.socket.eventsIo.broadcast("events", commandResult);

            setTimeout(function() {
                result.ch.reject(msg);
            }, 10);
        });

        return result;
    }
}

export class Socket {
    constructor() {
        this.eventsIo = new IO({
            namespace: 'events'
        });
        this.eventsIo.use(auth.passport);
    }
}

export const socket = new Socket();
export const events = new CmdbEvents(socket);