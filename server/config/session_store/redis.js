/**
 * Created by NICK on 16/8/5.
 */

import Redis from "ioredis";
import { Store } from "koa-session2";

export default (app) => {
    "use strict";
    class RedisStore extends Store {
        constructor() {
            super();
            this.redis = new Redis({
                port: 6379, // Redis port
                host: '127.0.0.1', // Redis host
                family: 4, // 4 (IPv4) or 6 (IPv6)
                password: '',
                db: 0
            });
        }

        async get(sid) {
            let val = await this.redis.get(`SESSION:${sid}`);

            return JSON.parse(val);
        }

        async set(session, opts) {
            if (!opts.sid) {
                opts.sid = this.getID(24);
            }

            await this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session));
            return opts.sid;
        }

        async destroy(sid) {
            return await this.redis.del(`SESSION:${sid}`);
        }
    }

    return RedisStore;
};