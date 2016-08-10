/**
 * Created by NICK on 16/8/5.
 */

import views from 'koa-views';

module.exports = (app, logger)=> {
    "use strict";

    app.use(views(__dirname + '/../../views', { extension: 'handlebars' }))
};