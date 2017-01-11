import boom from 'boom';
import db from '../../utils/db';
import utils from '../';

export default (sequelizeModel, config) => {

    config = config || {};

    return async(ctx, next) => {
        let curConfig = utils.mysql.getConfig(config, "/list/attrubutes");
        let filter = utils.mysql.query(ctx.query);
        let attributes = curConfig.attributes;

        attributes && (filter.attributes = attributes);
        ctx.body = await sequelizeModel.findAndCountAll(filter);
    };
};