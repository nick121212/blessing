/**
 * Created by NICK on 16/8/5.
 */

import etag from 'koa-etag';
import conditionalGet from 'koa-conditional-get';

export default (app) => {
    "use strict";

    app.use(conditionalGet());
    // app.use(etag());

};