import passport from 'koa-passport';
import { Strategy } from 'passport-local';

export default (app, log) => {
    "use strict";

    const user = { id: 1, username: 'nick' };

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, user);
    });

    passport.use(new Strategy(function(username, password, done) {
        log.info(username, password);

        if (username === 'nick' && password === 'nick') {
            return done(null, user);
        }

        return done(null, false, new Error("账号或者密码错误"));
    }))
}