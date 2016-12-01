import boom from 'boom';
import utils from '../';
import rabbitmq from '../../utils/rabbitmq';
import { client } from '../../utils/es';
import uuid from 'node-uuid';
import _ from 'lodash';
import db from '../../utils/db';

export default (sequelizeModel) => {
    /**
     * 创建模块数据
     */
    return async(ctx, next) => {
        let results = await utils.getEsList(ctx, "commdone.logs");

        ctx.body = results.hits;
    };
};