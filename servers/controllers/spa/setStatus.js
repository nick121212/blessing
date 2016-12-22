export default (config) => {

    return async(ctx, next) => {
        let clientId = ctx.context.user.clientId;

        if (ctx.proxy.connections.hasOwnProperty(clientId)) {
            ctx.proxy.connections[clientId].jobs = ~~ctx.params.jobs;
        }

        await next();
    };
};