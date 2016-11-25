/**
 * Created by NICK on 16/8/5.
 */

import methodOverride from 'koa-methodoverride';

export default (app, log) => {
    "use strict";

    app.use(methodOverride());
}