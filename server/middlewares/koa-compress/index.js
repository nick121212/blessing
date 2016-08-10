/**
 * Created by NICK on 16/8/5.
 */

import compress from 'koa-compress';

module.exports =(app)=> {
    "use strict";

    app.use(compress({
        filter: (content_type) => {
            return /text/i.test(content_type);
        },
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
    }));
}