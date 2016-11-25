import qs from 'koa-qs';
import query from 'qs-middleware';

export default (app, log) => {
    "use strict";

    qs(app, 'extended');

    // app.use(query());
};