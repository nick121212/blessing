import spa from "nspa";
import _ from "lodash";
import setStatus from "./controllers/spa/setStatus";
import applyAuth from "./controllers/spa/applyAuth";

var gitlab = require('node-gitlab');

var client = gitlab.create({
    api: 'http://code.4nb.tech/api/v3',
    privateToken: 'iEQ5A1269sJPz6LXsyUW'
});

console.log(client.repository.getTags);

client.repository.getTags({ id: 15 }, function(err, milestones) {
    console.log(err, milestones);
});

const initServer = async(spaServer, config) => {
    const serverCompose = new spa.Spa();

    spaServer.attachRouteToSocket("setStatus", await setStatus(config));
    spaServer.attachRouteToSocket("applyAuth", await applyAuth(config));

    serverCompose.use(spaServer.attach(serverCompose));
    serverCompose.use(async(ctx, next) => {
        await next();
    });
    spaServer.on("onconnect", (connection, connectionObject) => {
        connection.clientProxy.status &&
            connection.clientProxy.status().onReady(async(result) => {
                _.extend(connectionObject, result);
            });
    });
    spaServer.on("ondisconnect", (connection, connectionObject) => {

    });
};

export const app = new spa.Spa();

export default async(config, server) => {
    app.initServer(config.saltServer || {}, server);
    await initServer(app.spaServer);

    return app;
};