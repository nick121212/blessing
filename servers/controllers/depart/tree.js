import db from '../../utils/db';
import _ from 'lodash';
import utils from '../';

export default () => {
    return async(ctx, next) => {
        let sql = [];
        let filter = utils.mysql.query(ctx.query);
        let { depth } = filter.where || {};

        sql.push('select node.lft,node.rgt,node.key,node.title,(count(parent.lft)-1) as depth');
        sql.push('  from depart as node, depart as parent');
        sql.push('  where node.lft between parent.lft and parent.rgt');
        // sql.push('  and parent.rgt <=361');
        sql.push('  group by node.key');
        sql.push('  having count(parent.key)<$1');
        sql.push('  order by node.lft;');

        let results = await db.sequelize.query(sql.join(''), {
            bind: [depth || 10000]
                // bind: [_.map(results, (res) => { return res.key; })]
        });

        ctx.body = results[0];
    };
};