import Router from 'koa-better-router';
import passport from 'koa-passport';
import boom from 'boom';
import auth from '../auth';
import Promise from "bluebird";

export default (app) => {
    let router = Router({
        prefix: `/passport`
    });

    process.on("unhandledRejection", function(reason, p) {
        console.log("Unhandled Rejection at: Promise", reason);
    });


    router.addRoute('GET /login', [async(ctx, next) => {
        ctx.logout();
        throw boom.unauthorized("用户未登陆或没有权限!");
    }]);
    // 默认ad域
    router.addRoute('POST /login', [async(ctx, next) => {
        await passport.authenticate("ActiveDirectory", async(err, user) => {
            if (err === false) {
                throw boom.create(402, user);
            }
            if (!err) {
                throw boom.create(402, "用户名或密码不真确！");
            }
            ctx.login(err);

            ctx.body = {};
        })(ctx);
    }, async(ctx, next) => {
        ctx.body = ctx.state.user;
        await next();
    }]);

    // gitlab第三方登陆
    router.addRoute('GET /auth/gitlab', [passport.authenticate('gitlab')]);
    router.addRoute('GET /auth/gitlab/callback', [async(ctx, next) => {
        await passport.authenticate("gitlab", async(err, user) => {
            if (err === false) {
                throw boom.create(402, user);
            }
            if (!err) {
                throw boom.create(402, "用户名或密码不真确！");
            }
            ctx.login(err);
            // ctx.body = {};
            ctx.redirect("/");
        })(ctx);
    }, async(ctx, next) => {
        ctx.redirect("/");
        // await next();
    }]);

    router.addRoute('POST /logout', [async(ctx) => {
        ctx.logout();
        ctx.redirect(`/passport/login`);
    }]);

    return router;
};