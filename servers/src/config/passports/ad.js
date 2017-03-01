import ActiveDirectoryStrategy from "passport-activedirectory";
import ActiveDirectory from "activedirectory";
import db from "../../utils/db";

export default (passport, config) => {
    const ad = new ActiveDirectory(config);

    // ad.findUsers({}, function(err, users) {
    //     if (err) {
    //         console.log('ERROR: ' + JSON.stringify(err));
    //         return;
    //     }

    //     if ((!users) || (users.length == 0)) console.log('No users found.');
    //     else {
    //         console.log('findUsers: ' + JSON.stringify(users));
    //     }
    // });

    // ad.findGroups({}, function(err, groups) {
    //     if (err) {
    //         console.log('ERROR: ' + JSON.stringify(err));
    //         return;
    //     }
    //     console.log(groups);
    //     if ((!groups) || (groups.length == 0)) console.log('No groups found.');
    //     else {
    //         console.log('findGroups: ' + JSON.stringify(groups));
    //     }
    // });

    passport.use(new ActiveDirectoryStrategy({
        integrated: false,
        ldap: ad
    }, (profile, ad, done) => {
        ad.isUserMemberOf(profile._json.dn, 'AccessGroup', async(err, isMember) => {
            if (err) {
                return done(err);
            }
            let member = await db.models["member"].findOne({
                where: {
                    username: profile._json.mail
                }
            });
            if (!member) {
                member = await db.models["member"].create({
                    username: profile._json.mail,
                    password: "123456",
                    name: profile._json.displayName,
                    role: "cmdb"
                });
            }

            return done(null, member.dataValues);
        })
    }));
}