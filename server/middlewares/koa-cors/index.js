/**
 * Created by NICK on 16/8/5.
 */

import cors from 'koa-cors';

module.exports =(app)=> {
    "use strict";

    app.use(cors());
}