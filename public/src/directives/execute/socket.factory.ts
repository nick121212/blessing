import { module } from './module';
import * as io from 'socket.io-client';

module.factory("sockets", ["socketFactory", (socketFactory) => {
    const events = socketFactory({
        ioSocket: io("http://localhost:3000/events")
    });

    events.forward("error");
    events.forward("events");
    events.forward("connect");
    events.forward("disconnect");

    return {
        events: events
    };
}]);