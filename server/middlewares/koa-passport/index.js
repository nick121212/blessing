/**
 * Created by NICK on 16/8/5.
 */

import passport from 'koa-passport';
import session from "koa-session2";

export default (app) => {
    "use strict";

    app.use(session({
        key: "nicktyui", //default "koa:sess"
        store: new app.config.session_store.redis()
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}