import spa from "nspa";
import _ from "lodash";
import setStatus from "./controllers/spa/setStatus";
import applyAuth from "./controllers/spa/applyAuth";

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
};

export const app = new spa.Spa();

export default async(config, server) => {
    app.initServer(config.saltServer || {}, server);
    await initServer(app.spaServer);

    return app;
};