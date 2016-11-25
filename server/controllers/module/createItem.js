const boom = require("boom");

export default (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.module);
    let { models, sequelize, Sequelize } = app.config.db.index;

    /**
     * 创建模块数据
     * 1、验证数据的合法性
     * 2、判断数据库中是否存在【key】的模块,有则报错
     * 3、判断父级模块是否存在,如果存在,而创建的模块又是父级模块,则报错
     * 4、更新数据库中的模块的左右值
     * 5、创建新数据,数据的左值=父级模块的右值,右值=父级模块的右值+2
     */
    return async(ctx, next) => {
        let model = ctx.request.body;
        let trans = await sequelize.transaction();

        if (typeof model !== "object" || !model.title || !model.key) {
            throw boom.badData('数据没有填写完整!');
        }

        let findModel = await Model.count({
            where: {
                key: model.key
            }
        });

        if (findModel) {
            throw boom.badData(`已经存在【${model.key}】的模块!`);
        }

        let parentModel = await Model.findOne({
                where: {
                    key: model.parentKey || ""
                }
            }),
            parentCount = await Model.count({
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
                await sequelize.query('update module set rgt=rgt+2 where rgt >= $1;', {
                    transaction: trans,
                    bind: [parentModel.rgt]
                });

                model.lft = parentModel.rgt;
                model.rgt = parentModel.rgt + 1;
            } else {
                model.lft = 1;
                model.rgt = 2;
            }

            let newModel = await Model.create(model, { transaction: trans });

            await trans.commit();

            ctx.body = newModel;
        } catch (e) {
            await trans.rollback();

            throw e;
        }
    };
};