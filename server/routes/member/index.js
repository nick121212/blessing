/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';
import * as _ from 'lodash';

export default (app) => {
    let utils = app.config.utils.index;
    let router = _.first(_.filter(app.routes.index, (router, key) => {
        return key === utils.modelNames.member;
    }));

    router.stack.shift();
    router.stack.shift();
    router.get('/', app.controllers.member['list'](utils.modelNames.member))
        .get('/:key', app.controllers.member['getItem'](utils.modelNames.member));

    return router;
};