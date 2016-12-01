import boom from 'boom';
import utils from '../';
import _ from 'lodash';

export default (sequelizeModel) => {
    /**
     * 创建模块数据
     */
    return async(ctx, next) => {
        let results = await utils.getEsList(ctx, "cmdb.execute.cmd");

        ctx.body = results.hits;
    };
};