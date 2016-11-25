/**
 * Created by NICK on 16/8/5.
 */

import cors from 'koa-cors';

export default (app) => {
    "use strict";

    app.use(cors({
        origin: "*",
        // methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        headers: ['Content-Type']
    }));
}