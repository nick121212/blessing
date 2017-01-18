import boom from 'boom';
import db from '../../utils/db';
import utils from '../';
import ip from "ip";
import _ from "lodash";

export default () => {
    let localIp = ip.address();

    return async(ctx, next) => {
        ctx.req.file && (ctx.req.file.staticUrl = "http://" + localIp + ":3000/uploads/" + ctx.req.file.filename);

        ctx.body = ctx.req.file;
    };
};