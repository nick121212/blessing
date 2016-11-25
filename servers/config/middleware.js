import { RedisStore } from './store';
import { Strategy } from 'passport-local';

const user = { id: 1, username: 'nick' };

export default {
    middlewares: {
        'koa-handle-error': [(err) => {
            console.log("----", err);
        }],
        'koa-better-body': [{
            fields: "body",
            files: true,
            // querystring: require('qs')
        }],
        'koa-methodoverride': [],
        'koa-compress': [{
            filter: (content_type) => {
                return /text/i.test(content_type)
            },
            threshold: 2048,
            flush: require('zlib').Z_SYNC_FLUSH
        }],
        'koa-passport': (app, passport) => {
            app.use(passport.initialize());
            app.use(passport.session());

            passport.serializeUser(function(u, done) {
                done(null, u.id);
            });
            passport.deserializeUser(function(id, done) {
                done(null, user);
            });
            passport.use(new Strategy({
                // usernameField: 'nickname',
                // passwordField: 'passport',
                passReqToCallback: false,
                session: true
            }, function(username, password, done) {
                console.log(username, password);

                if (username === 'nick' && password === 'nick') {
                    return done(null, user);
                }

                return done(null, false, new Error("账号或者密码错误!"));
            }));
        },
        'koa-session2': [{
            key: 'NICKTYUI',
            store: new RedisStore()
        }],
        'koa-cors': [{
            methods: ["PUT", "GET", "POST", "DELETE", "HEAD"],
            origin: "*"
        }]
    },
    custom: {
        'error': (app) => {
            app.use(async(ctx, next) => {
                try {
                    await next();
                    if (ctx.status === 404) ctx.throw(404);
                } catch (err) {
                    if (err.isBoom) {
                        ctx.status = err.output.statusCode;
                    } else {
                        ctx.status = err.status || 500;
                    }
                    ctx.body = {
                        msg: err.body || err.message,
                        status: ctx.status,
                        url: ctx.url,
                        name: app.name,
                        stack: app.env === "production" ? "" : err.stack + "\n"
                    };
                }
            });
        }
    },
    order: [
        'koa-methodoverride',
        'koa-compress',
        'koa-conditional-get',
        'koa-etag',
        'koa-cors',
        'koa-better-body',
        "koa-session2",
        'koa-passport',
        'koa-handle-error',
        'error'
    ]
}