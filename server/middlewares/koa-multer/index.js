/**
 * Created by NICK on 16/8/5.
 */

import multer from 'koa-multer';

module.exports = (app)=> {
    "use strict";
    const upload = multer({dest: './uploads/'});

    return upload;
}