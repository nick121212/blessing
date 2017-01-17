import boom from 'boom';
import db from '../../utils/db';
import utils from '../';

export default (sequelizeModel, config) => {

    /**
     * 创建模块数据
     */
    return async(ctx, next) => {
        let modelIntance = ctx.request.body;

        if (typeof modelIntance !== "object") {
            throw boom.badData('数据没有填写完整!');
        }

        utils.mysql.checkUniqueFields(sequelizeModel, modelIntance);
        utils.mysql.removeAttributes();

        modelIntance.createdAt = Date.now();

        ctx.body = await sequelizeModel.create(modelIntance);
    };
};