export default (app, logger) => {
    let env = process.env.NODE_ENV;

    if (env === "production") {
        return app.config.config.env.production;
    }

    return app.config.config.env.development;
};