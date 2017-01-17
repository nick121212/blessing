import boom from 'boom';
import db from '../../utils/db';
import utils from '../';
import os from "os";

export default () => {
    let IPv4;

    for (var i = 0; i < os.networkInterfaces().en0.length; i++) {
        if (os.networkInterfaces().en0[i].family == 'IPv4') {
            IPv4 = os.networkInterfaces().en0[i].address;
        }
    }

    return async(ctx, next) => {

        ctx.req.file && (ctx.req.file.staticUrl = "http://" + IPv4 + ":3000/uploads/" + ctx.req.file.filename);

        ctx.body = ctx.req.file;
    };
};