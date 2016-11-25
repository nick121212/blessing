/**
 * Created by NICK on 16/8/5.
 */

import koaSlow from 'koa-slow';

export default (app) => {
    "use strict";

    app.use(koaSlow({
        url: /\.jpg|\.png$/i,
        delay: 2000
    }));
};