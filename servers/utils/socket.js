import IO from 'koa-socket';
import auth from '../auth';
import rabbitmq from './rabbitmq';
import utils from '../controllers';
import _ from 'lodash';
import { client } from './es';

export class CmdbEvents {
    constructor(socket) {
        this.socket = socket;
        this.getEvents();
        this.checkExecuteTimeout();
    }

    async checkExecuteTimeout() {
        let result = await rabbitmq.getQueue('job.done', {});

        await result.ch.prefetch(1);
        await result.ch.consume(result.q.queue, async(msg) => {
            let commandResult = JSON.parse(msg.content.toString());

            let commlogs = await utils.getEsList({
                where: {
                    query: {
                        "bool": {
                            "must": [{
                                "constant_score": {
                                    "filter": {
                                        "missing": {
                                            "field": "_stamp"
                                        }
                                    }
                                }
                            }, {
                                "match": {
                                    "jid": commandResult.jobid
                                }
                            }]
                        }
                    }
                }
            }, "commdone.logs");

            if (commlogs.hits.total) {
                let resultTimeout = await rabbitmq.getQueue("cmdb.events", {});
                _.each(commlogs.hits.hits, async(item) => {
                    console.log("-----item-----", item);
                    let queueItem = { "jid": commandResult.jobid, "retcode": 1, "return": "timeout", "success": false, "_stamp": new Date(), timeout: true, deviceSn: item._source.deviceSn }
                    let resTimeout = await resultTimeout.ch.publish("amq.topic", `salt.events`, new Buffer(JSON.stringify(queueItem)), {
                        persistent: true
                    });
                });
                await resultTimeout.ch.close();
            }
            await client.update({
                index: "cmdb.execute.cmd",
                type: "salt",
                id: commandResult.jobid,
                body: {
                    doc: {
                        complete: true
                    }
                }
            });

            result.ch.ack(msg);
        });

        return result;
    }

    async getEvents() {
        let result = await rabbitmq.getQueue('job.res', {});

        await result.ch.prefetch(1);
        await result.ch.consume(result.q.queue, (msg) => {
            let commandResult = JSON.parse(msg.content.toString());
            this.socket.eventsIo.broadcast("events", {
                _id: `${commandResult.jid}#${commandResult.deviceSn}`,
                _source: commandResult
            });

            setTimeout(function() {
                result.ch.ack(msg);
            }, 10);
        });

        return result;
    }
}

export class Socket {
    constructor() {
        this.eventsIo = new IO({
            namespace: 'events'
        });
        this.eventsIo.use(auth.passport);
    }
}

export const socket = new Socket();
export const events = new CmdbEvents(socket);