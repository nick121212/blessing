/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';
import * as _ from 'lodash';

module.exports = (app) => {
    let routers = {};
    let { models } = app.config.db.index;

    _.each(models, (modelName) => {
        let router = new Router({
            prefix: `/${modelName.name}s`
        });
        let keys = [];
        let primaryKey;

        _.forEach(modelName.attributes, (attr, key) => {
            if (attr.unique) {
                keys.push(key);
            }
            if (attr.primaryKey) {
                primaryKey = key;
            }
        });
        router.get('/', app.controllers.common['list'](modelName.name))
            .get('/:key', app.controllers.common['getItem'](modelName.name))
            .post('/', app.controllers.common['createItem'](modelName.name, keys))
            .put('/:key', app.controllers.common['updateItem'](modelName.name, keys, primaryKey))
            .delete('/:key', app.controllers.common['removeItem'](modelName.name, primaryKey));
        routers[modelName.name] = router;
        app.use(router.routes()).use(router.allowedMethods());
    });

    return routers;
};