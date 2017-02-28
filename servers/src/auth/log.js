import log4js from "log4js";
import config from "../config";

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: config.site.log,
            category: 'cmdb',
            layout: {
                type: 'pattern',
                pattern: '%m%n'
            }
        }
    ]
});

export let logger = log4js.getLogger('cmdb');

logger.setLevel("ALL");
// logger.info("test");
// logger.trace("Time:", new Date());

export const info = async(ctx, next) => {
    if (ctx.log) {
        logger.trace(JSON.stringify(ctx.log));
    }
    await next();
}