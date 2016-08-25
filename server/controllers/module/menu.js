exports = module.exports = (app, logger) => {
    // let utils = app.config.utils.index;
    // let Model = utils.findModel(utils.modelNames.module);
    let {models, sequelize, Sequelize} = app.config.db.index;

    return async(ctx, next) => {
        let sql = [];

        // sql.push(' SELECT node.*,(count(parent.id)-1) as depth');
        // sql.push(' FROM menu as node, menu as parent');
        // sql.push(' where node.lft between parent.lft and parent.rgt');
        // sql.push(' and node.key in (select distinct a.parentKey from rolegroup as rg');
        // sql.push(' inner join groupaction as ga on rg.groupKey = ga.groupKey');
        // sql.push(' inner join action as a on a.key = ga.actionKey');
        // sql.push(' where rg.rolekey in ($1))');
        // sql.push(' group by node.id');
        // sql.push(' order by node.lft');


        sql.push('select node.*,(count(parent.id)-1) as depth');
        sql.push('  from module as node, module as parent');
        sql.push('  where node.lft between parent.lft and parent.rgt');
        sql.push('  group by node.id');
        sql.push('  order by node.lft;');


        let results = await sequelize.query(sql.join(''), {
            bind: []
        });

        ctx.body = results[0];
    };
};