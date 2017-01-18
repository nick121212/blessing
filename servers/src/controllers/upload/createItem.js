import boom from 'boom';
import db from '../../utils/db';
import utils from '../';
import os from "os";

export default () => {
    let ips = {};

    _.forEach(os.networkInterfaces(), (network) => {
        _.each(network, (ipInfo) => {
            !ips[ipInfo.family] && (ips[ipInfo.family] = []);
            ipInfo.address != "127.0.0.1" && ips[ipInfo.family].push(ipInfo.address);
        });
    });

    console.log(ips);

    return async(ctx, next) => {

        ctx.req.file && (ctx.req.file.staticUrl = "http://" + ips + ":3000/uploads/" + ctx.req.file.filename);

        ctx.body = ctx.req.file;
    };
};