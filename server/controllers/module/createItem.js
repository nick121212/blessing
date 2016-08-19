const boom = require("boom");

exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.module);
    let {models, sequelize, Sequelize} = app.config.db.index;

    return async(ctx, next) => {
        let trans = await sequelize.transaction();
        let model = ctx.body;

        if (typeof model !== "object" || !model.title) {
            throw boom.badData('数据没有填写完整!');
        }

        let parentModel = await Model.findOne({
            where: {
                key: model.parentKey || ""
            }
        }), parentCount = await Model.count({
            where: {
                lft: 1
            }
        });

        if (parentCount && !parentModel) {
            throw boom.badData('没有指定父节点!');
        }

        try {
            if (parentModel) {
                await sequelize.query('update module set lft=lft+2 where lft > $1;', {
                    transaction: trans,
                    bind: [parentModel.rgt]
                });
                await sequelize.query('update menu set rgt=rgt+2 where rgt >= $1;', {
                    transaction: trans,
                    bind: [parentModel.rgt]
                });

                model.lft = parentModel.rgt;
                model.rgt = parentModel.rgt + 1;
            } else {
                model.lft = 1;
                model.rgt = 2;
            }

            let newModel = await Model.create(model, {transaction: trans});

            await trans.commit();

            ctx.body =newModel;
        }
        catch (e) {
            await trans.rollback();

            throw e;
        }

    };
};