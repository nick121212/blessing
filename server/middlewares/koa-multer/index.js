/**
 * Created by NICK on 16/8/5.
 */

import multer from 'koa-multer';

export default (app) => {
    "use strict";
    const upload = multer({ dest: './uploads/' });

    return upload;
}