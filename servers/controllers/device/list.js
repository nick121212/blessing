import utils from '../';

export default () => {
    return async(ctx, next) => {
        let results = await utils.getEsList(ctx, 'cmdb.device');

        ctx.body = results.hits;
    };
};