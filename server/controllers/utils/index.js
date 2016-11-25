const boom = require("boom");
const _ = require('lodash');

export default (app, logger) => {
    let utils = app.config.utils.index;

    /**
     * 创建模块数据
     */
    return {
        checkUniqueFields: async(Model, uniqueFields) => {
            if (_.isArray(uniqueFields) && uniqueFields.length) {
                let where = [];

                _.each(uniqueFields, (field) => {
                    if (model[field]) {
                        where.push({
                            [field]: model[field]
                        });
                    } else {
                        throw boom.badData(`【${field}】没有填写完整!`);
                    }
                });

                if (where.length) {
                    let findModel = await Model.count({
                        where: {
                            $or: where
                        }
                    });

                    if (findModel) {
                        throw boom.badData(`主键${_.join(uniqueFields,',')}已经存在!`);
                    }
                }
            }
        },
        removeAttributes: async(modelIntance, Model) => {
            _.forEach(modelIntance, (val, key) => {
                if (!Model.attributes.hasOwnProperty(key)) {
                    delete model[key];
                }
            });
        }
    }
}