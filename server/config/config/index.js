module.exports = (app)=> {
    let env = process.env.NODE_ENV;

    if (env === "production") {
        return app.config.config.production;
    }

    return app.config.config.development;
};