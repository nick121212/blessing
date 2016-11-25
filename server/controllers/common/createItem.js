const boom = require("boom");
const _ = require('lodash');

export default (app, logger) => {

    return (modelName, uniqueFields) => {
        "use strict";

        let utils = app.config.utils.index;
        let Model = utils.findModel(modelName);
        let { models, sequelize, Sequelize } = app.config.db.index;
        let controllerUtils = app.controllers.utils.index;

        /**
         * 创建模块数据
         */
        return async(ctx, next) => {
            let model = ctx.request.body;

            if (typeof model !== "object") {
                throw boom.badData('数据没有填写完整!');
            }

            controllerUtils.checkUniqueFields(Model, uniqueFields);
            controllerUtils.removeAttributes();
            model.createdAt = ~~(Date.now() / 1000);

            ctx.body = await Model.create(model);
        };
    }
};