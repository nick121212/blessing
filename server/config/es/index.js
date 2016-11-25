/**
 * Created by NICK on 16/8/9.
 */

import elasticsearch from 'elasticsearch';

export default (app, logger) => {
    let config = app.config.config.index;
    const client = new elasticsearch.Client({
        host: `${config.es.host}:${config.es.port}`,
        log: config.es.log
    });

    // setInterval(() => {
    //     client.ping({
    //         requestTimeout: Infinity,
    //         hello: "elasticsearch!"
    //     }).catch((err) => {
    //         throw err;
    //     });
    // }, 10000);

    return {
        client: client
    };
};