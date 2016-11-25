/**
 * Created by NICK on 16/8/5.
 */

import views from 'koa-views';

export default (app, logger) => {
    "use strict";

    app.use(views(__dirname + '/../../views', { extension: 'handlebars' }))
};