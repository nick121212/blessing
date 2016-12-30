import { Strategy } from "passport-local";
import crypto from "crypto-browserify";
import db from "../../utils/db";

console.log(Strategy);

export default (passport) => {
    // passport.serializeUser(function(u, done) {
    //     done(null, u);
    // });
    // passport.deserializeUser(async function(id, done) {
    //     done(null, id);
    // });
    passport.use(new Strategy({
        passReqToCallback: false,
        session: true
    }, async function(username, password, done) {
        let member = await db.models["member"].findOne({
            where: {
                username: username
            }
        });

        if (member) {
            let sha1 = crypto.createHash("sha1");
            sha1.update(password);
            password = sha1.digest("hex");
            if (member.password === password) {
                delete member.password;
                return done(null, member.dataValues);
            }
        }

        return done(null, false, new Error("账号或者密码错误!"));
    }));
}