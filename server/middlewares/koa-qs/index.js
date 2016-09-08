import qs from 'koa-qs';
import query from 'qs-middleware';

module.exports = (app, log)=> {
    "use strict";

    qs(app, 'extended');

    // app.use(query());
};