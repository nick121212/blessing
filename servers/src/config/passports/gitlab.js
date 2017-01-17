import { Strategy } from "passport-gitlab2";
import db from "../../utils/db";

export default (passport, config) => {
    let strategy = new Strategy(config, async(accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken, profile);
        let member = await db.models["member"].findOne({
            where: {
                username: profile._json.email
            }
        });
        if (!member) {
            member = await db.models["member"].create({
                username: profile._json.email,
                password: "123456",
                avatar: profile._json.avatar_url,
                name: profile._json.name
            });
        }

        return done(null, member.dataValues);
    });
    passport.use(strategy);
}