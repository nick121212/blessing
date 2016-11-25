import boom from 'boom';
import db from '../../utils/db';

export default () => {
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


        sql.push('select node.*,(count(parent.key)-1) as depth');
        sql.push('  from module as node, module as parent');
        sql.push('  where node.lft between parent.lft and parent.rgt');
        sql.push('  group by node.key');
        sql.push('  order by node.lft;');

        let results = await db.sequelize.query(sql.join(''), {
            bind: []
        });

        ctx.body = results[0];
    };
};