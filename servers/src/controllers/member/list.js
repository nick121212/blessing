import boom from 'boom';
import db from '../../utils/db';
import utils from '../';
import ActiveDirectory from "activedirectory";
import config from '../../config';
import Promise from "bluebird";

export default () => {
    const ad = new ActiveDirectory(config.auth.ldap);
    let findUsers = Promise.promisify(ad.findUsers, { context: ad });

    // findUsers({
    //     sizeLimit: 20,
    //     filter: `(|(userPrincipalName=51031695*)(employeeID=51031695))`
    // }).then((dd) => {
    //     console.log(dd);
    // });

    return async(ctx, next) => {
        let filter = utils.mysql.query(ctx.query);

        console.log(filter);

        filter.suggest = filter.suggest || {};

        let result = await findUsers({
            sizeLimit: 20,
            filter: `(|(userPrincipalName=${filter.suggest.text}*)(employeeID=${filter.suggest.text}))`
        });

        ctx.body = {
            rows: result
        };
    };
};