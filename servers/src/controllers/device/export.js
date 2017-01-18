import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import utils from '../';
import config from '../../config';

export default () => {
    return async(ctx, next) => {
        let filter = utils.elastic.getEsQuery(ctx.query);

        ctx.redirect(config.site.exportUrl + "?where=" + decodeURIComponent(JSON.stringify(filter.esQuery)));
    };
};