const boom = require("boom");

exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.module);
    let {models, sequelize, Sequelize} = app.config.db.index;

    return async(ctx, next) => {
        let key = ctx.params["key"];

        if (!key) {
            throw boom.badData(`key不能为空`);
        }
        let trans = await sequelize.transaction();
        let model = await Model.findOne({
            where: {
                key: key
            }
        });
        if (!model) {
            throw boom.badData(`找不到key:${key}的数据或者已删除!`);
        }

        try {
            await sequelize.query('delete from module where lft between $1 and $2;', {
                transaction: trans,
                bind: [model.lft, model.rgt]
            });
            await sequelize.query('update module set lft=lft-$1 where lft > $2;', {
                transaction: trans,
                bind: [model.rgt - model.lft + 1, model.rgt]
            });
            await sequelize.query('update module set rgt=rgt-$1 where rgt > $2;', {
                transaction: trans,
                bind: [model.rgt - model.lft + 1, model.rgt]
            });

            await trans.commit();
        } catch (e) {
            await trans.rollback();

            throw e;
        }

        ctx.body = model;
    };
};