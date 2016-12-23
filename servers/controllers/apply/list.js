import utils from '../';

export default () => {
    return async(ctx, next) => {
        let results = await utils.getEsList(ctx.query, 'cmdb.apply');

        ctx.body = results.hits;
    };
};