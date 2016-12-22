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

        console.log(connection.clientProxy);

        connection.clientProxy.status &&
            connection.clientProxy.status().onReady((result) => {
                connectionObject.jobs = result;
            });
    });
};

export default async(config, server) => {
    const app = new spa.Spa();
    console.log(config);
    app.initServer(config.saltServer || {}, server);

    await initServer(app.spaServer);
};