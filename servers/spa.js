import spa from "nspa";
import setStatus from "./controllers/spa/setStatus";

const initServer = async(spaServer, config) => {
    const serverCompose = new spa.Spa();

    spaServer.attachRouteToSocket("setStatus", await setStatus(config));
    serverCompose.use(spaServer.attach(serverCompose));
    serverCompose.use(async(ctx, next) => {
        await next();
    });
    spaServer.on("onconnect", (connection, connectionObject) => {
        connection.clientProxy.status &&
            connection.clientProxy.status().onReady((result) => {
                connectionObject.jobs = result;
            });
        connection.clientProxy.createFile &&
            connection.clientProxy.createFile().onReady((result) => {
                console.log(result);
            })
    });
};

export default async(config, server) => {
    const app = new spa.Spa();

    app.initServer(config.saltServer || {}, server);

    await initServer(app.spaServer);
};