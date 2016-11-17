/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';
import * as _ from 'lodash';

module.exports = (app) => {
    let utils = app.config.utils.index;
    let router = _.first(_.filter(app.routes.index, (router, key) => {
        return key === utils.modelNames.module;
    }));

    router.stack.length = 0;
    router.get('/', app.controllers[utils.modelNames.module]['list'])
        .get('/menu', app.controllers[utils.modelNames.module]['menu'])
        .get('/:key', app.controllers[utils.modelNames.module]['getItem'])
        .post('/', app.controllers[utils.modelNames.module]['createItem'])
        .put('/:key', app.controllers[utils.modelNames.module]['updateItem'])
        .delete('/:key', app.controllers[utils.modelNames.module]['removeItem']);

    return router;
};