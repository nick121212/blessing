import boom from 'boom';
import db from '../../utils/db';
import utils from '../';
import ip from "ip";
import _ from "lodash";

export default () => {
    let ip = ip.address();

    return async(ctx, next) => {
        ctx.req.file && (ctx.req.file.staticUrl = "http://" + ip + ":3000/uploads/" + ctx.req.file.filename);

        ctx.body = ctx.req.file;
    };
};