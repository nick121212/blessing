import { module } from './module';
import * as io from 'socket.io-client';

module.factory("sockets", ["socketFactory", "$rootScope", (socketFactory, $rootScope) => {
    const events = socketFactory({
        ioSocket: io($rootScope.config.events)
    });

    events.forward("error");
    events.forward("events");
    events.forward("connect");
    events.forward("disconnect");

    return {
        events: events
    };
}]);